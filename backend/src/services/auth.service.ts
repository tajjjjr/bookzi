import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { OAuth2Client } from 'google-auth-library';
import { UserRepository } from '../repositories/user.repository.js';
import { users } from '../db/schema.js';
import { encrypt } from '../utils/encryption.js';

export class AuthService {
  private jwtSecret: string;
  private userRepo: UserRepository;
  private googleClient: OAuth2Client;

  constructor(jwtSecret: string) {
    this.jwtSecret = jwtSecret;
    this.userRepo = new UserRepository();
    this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  signToken(user: typeof users.$inferSelect): string {
    return jwt.sign(
      { id: user.id, email: user.email },
      this.jwtSecret,
      { expiresIn: '24h' }
    );
  }

  async getUserFromJWT(token: string): Promise<typeof users.$inferSelect | null> {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as { id: string };
      return await this.userRepo.findById(decoded.id);
    } catch {
      return null;
    }
  }

  async validateCredentials(email: string, password: string): Promise<typeof users.$inferSelect | null> {
    const user = await this.userRepo.findByEmail(email);
    if (!user || !user.password) return null;

    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }

  async createUser(userData: { first_name: string; last_name: string; email: string; password: string; phone_number?: string; country?: string; zip_code?: string }): Promise<typeof users.$inferSelect> {
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    const now = new Date().toISOString();
    
    return await this.userRepo.create({
      id: randomUUID(),
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      password: hashedPassword,
      google_id: null,
      avatar_url: null,
      auth_provider: 'local',
      phone_number: userData.phone_number ? encrypt(userData.phone_number) : null,
      country: userData.country || null,
      zip_code: userData.zip_code ? encrypt(userData.zip_code) : null,
      role: 'user',
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });
  }

  async emailExists(email: string): Promise<boolean> {
    const user = await this.userRepo.findByEmail(email);
    return !!user;
  }

  async verifyGoogleToken(token: string): Promise<{ email: string; first_name: string; last_name: string; picture?: string; google_id: string } | null> {
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      
      const payload = ticket.getPayload();
      if (!payload || !payload.email || !payload.sub) return null;
      
      const nameParts = (payload.name || '').split(' ');
      return {
        email: payload.email,
        first_name: nameParts[0] || 'User',
        last_name: nameParts.slice(1).join(' ') || 'Account',
        picture: payload.picture,
        google_id: payload.sub
      };
    } catch {
      return null;
    }
  }

  async createGoogleUser(googleData: { email: string; first_name: string; last_name: string; picture?: string; google_id: string }): Promise<typeof users.$inferSelect> {
    const now = new Date().toISOString();
    
    return await this.userRepo.create({
      id: randomUUID(),
      first_name: googleData.first_name,
      last_name: googleData.last_name,
      email: googleData.email,
      password: null,
      google_id: googleData.google_id,
      avatar_url: googleData.picture || null,
      auth_provider: 'google',
      phone_number: null,
      country: null,
      zip_code: null,
      role: 'user',
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });
  }

  async findByGoogleId(googleId: string): Promise<typeof users.$inferSelect | null> {
    return this.userRepo.findByGoogleId(googleId);
  }

  async findByEmail(email: string): Promise<typeof users.$inferSelect | null> {
    return this.userRepo.findByEmail(email);
  }
}