import { User } from "../../types/models.ts";
export { User };

export interface AuthAdapter {
  // Token operations
  signToken(user: User): string;
  getUserFromJWT(token: string): Promise<User | null>;
  isAuthenticated(token: string): Promise<boolean>;
  
  // User retrieval
  getUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  
  // User existence checks
  userExists(id: string): Promise<boolean>;
  emailExists(email: string): Promise<boolean>;
  
  // User management (password should be pre-hashed before calling createUser/updateUser)
  createUser(userData: Omit<User, 'id'>): Promise<User>;
  updateUser(id: string, userData: Partial<Omit<User, 'id' | 'password'>>): Promise<User | null>;
  deleteUser(id: string): Promise<boolean>;
  
  // Authentication operations
  validateCredentials(email: string, password: string): Promise<User | null>;
  changePassword(userId: string, oldPassword: string, newPassword: string): Promise<boolean>;
  resetPassword(userId: string, newPassword: string): Promise<boolean>;
  
  // Optional: Session management
  createSession?(userId: string, metadata?: Record<string, unknown>): Promise<string>;
  validateSession?(sessionId: string): Promise<User | null>;
  revokeSession?(sessionId: string): Promise<boolean>;
}
