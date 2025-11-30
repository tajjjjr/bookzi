import { User } from "../../types/models.ts"

export { User };

export interface AuthAdapter {
  signToken(_user: User): string;
  getUserFromJWT(_token: string): Promise<User | null>;
  isAuthenticated(_token: string): Promise<boolean>;
  getUsers(): User[];
}