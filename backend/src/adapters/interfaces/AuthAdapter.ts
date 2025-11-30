
export interface User {
  id: number;
  name: string;
}

export interface AuthAdapter {
  signToken(_user: User): string;
  getUserFromJWT(_token: string): Promise<User | null>;
  isAuthenticated(_token: string): Promise<boolean>;
  getUsers(): User[];
}