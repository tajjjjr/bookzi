import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { BaseAuthAdapter } from './abstract.ts';
import { User } from '../../types/models.ts';
import { SQLiteAdapter } from '../sqlite/sqlite.adapter.ts';

export class AuthAdapter extends BaseAuthAdapter {
  private secret: string;
  private db: SQLiteAdapter;

  constructor(secret: string, db: SQLiteAdapter) {
    super();
    this.secret = secret;
    this.db = db;
  }

  signToken(user: User): string {
    return jwt.sign(
      { 
        sub: String(user.id), 
        email: user.email,
        name: user.name 
      },
      this.secret,
      { expiresIn: '7d' }
    );
  }

  async getUserFromJWT(token: string): Promise<User | null> {
    try {
      const decoded = jwt.verify(token, this.secret, {
        algorithms: ['HS256']
      }) as jwt.JwtPayload;

      if (!decoded.sub) {
        return null;
      }

      return await this.getUserById(decoded.sub);
    } catch {
      return null;
    }
  }

  async isAuthenticated(token: string): Promise<boolean> {
    try {
      jwt.verify(token, this.secret, { algorithms: ['HS256'] });
      return true;
    } catch {
      return false;
    }
  }

  async getUsers(): Promise<User[]> {
    const database = this.db.getDatabase();
    const results = database.prepare("SELECT * FROM users").all() as User[];
    return results;
  }

  async getUserById(id: string): Promise<User | null> {
    const database = this.db.getDatabase();
    const result = database.prepare("SELECT * FROM users WHERE id = ?").get(id) as User | undefined;
    return result || null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const database = this.db.getDatabase();
    const result = database.prepare("SELECT * FROM users WHERE email = ?").get(email) as User | undefined;
    return result || null;
  }

  async userExists(id: string): Promise<boolean> {
    const user = await this.getUserById(id);
    return user !== null;
  }

  async emailExists(email: string): Promise<boolean> {
    const user = await this.getUserByEmail(email);
    return user !== null;
  }

  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    const database = this.db.getDatabase();
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const info = database.prepare(`
      INSERT INTO users (name, email, password)
      VALUES (?, ?, ?)
    `).run(userData.name, userData.email, hashedPassword);

    return {
      id: String(info.lastInsertRowid),
      name: userData.name,
      email: userData.email,
      password: hashedPassword
    };
  }

  async updateUser(id: string, userData: Partial<Omit<User, 'id' | 'password'>>): Promise<User | null> {
    await this.ensureUserExists(id);
    
    const database = this.db.getDatabase();
    const setParts: string[] = [];
    const values: (string | number)[] = [];

    if (userData.name !== undefined) {
      setParts.push('name = ?');
      values.push(userData.name);
    }
    if (userData.email !== undefined) {
      setParts.push('email = ?');
      values.push(userData.email);
    }

    if (setParts.length === 0) {
      return await this.getUserById(id);
    }

    values.push(id);
    database.prepare(`UPDATE users SET ${setParts.join(', ')} WHERE id = ?`).run(...values);
    
    return await this.getUserById(id);
  }

  async deleteUser(id: string): Promise<boolean> {
    const database = this.db.getDatabase();
    const result = database.prepare("DELETE FROM users WHERE id = ?").run(id);
    return result.changes > 0;
  }

  async validateCredentials(email: string, password: string): Promise<User | null> {
    const user = await this.getUserByEmail(email);
    if (!user) {
      return null;
    }

    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }

  async changePassword(userId: string, oldPassword: string, newPassword: string): Promise<boolean> {
    const user = await this.getUserById(userId);
    if (!user) {
      return false;
    }

    const isValidOldPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isValidOldPassword) {
      return false;
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    const database = this.db.getDatabase();
    const result = database.prepare("UPDATE users SET password = ? WHERE id = ?").run(hashedNewPassword, userId);
    
    return result.changes > 0;
  }

  async resetPassword(userId: string, newPassword: string): Promise<boolean> {
    await this.ensureUserExists(userId);
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const database = this.db.getDatabase();
    const result = database.prepare("UPDATE users SET password = ? WHERE id = ?").run(hashedPassword, userId);
    
    return result.changes > 0;
  }
}
