import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { UserRepository } from '../repositories/user.repository.js';
import { users } from '../db/schema.js';

export class AuthService {
  private jwtSecret: string;
  private userRepo: UserRepository;

  constructor(jwtSecret: string) {
    this.jwtSecret = jwtSecret;
    this.userRepo = new UserRepository();
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
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }

  async createUser(userData: { name: string; email: string; password: string }): Promise<typeof users.$inferSelect> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const now = new Date().toISOString();
    
    return await this.userRepo.create({
      id: randomUUID(),
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
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
}