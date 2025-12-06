import { AuthAdapter } from "../interfaces/AuthAdapter.ts";
import { User } from "../../types/models.ts";

export abstract class BaseAuthAdapter implements AuthAdapter {
  abstract signToken(user: User): string;
  abstract getUserFromJWT(token: string): Promise<User | null>;
  abstract isAuthenticated(token: string): Promise<boolean>;
  abstract getUsers(): Promise<User[]>;
  abstract getUserById(id: string): Promise<User | null>;
  abstract getUserByEmail(email: string): Promise<User | null>;
  abstract userExists(id: string): Promise<boolean>;
  abstract emailExists(email: string): Promise<boolean>;
  abstract createUser(userData: Omit<User, 'id'>): Promise<User>;
  abstract updateUser(id: string, userData: Partial<Omit<User, 'id' | 'password'>>): Promise<User | null>;
  abstract deleteUser(id: string): Promise<boolean>;
  abstract validateCredentials(email: string, password: string): Promise<User | null>;
  abstract changePassword(userId: string, oldPassword: string, newPassword: string): Promise<boolean>;
  abstract resetPassword(userId: string, newPassword: string): Promise<boolean>;
  
  // Helper method for common validation
  protected async ensureUserExists(id: string): Promise<void> {
    const exists = await this.userExists(id);
    if (!exists) {
      throw new Error(`User with id ${id} does not exist`);
    }
  }
}