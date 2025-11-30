import jwt from "jsonwebtoken";
import { User, AuthAdapter } from "../interfaces/AuthAdapter.ts";

const SECRET = "mock-secret";

const mockUsers: User[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" }
];

const mockAuthAdapter: AuthAdapter = {
  signToken: (user: User): string => 
    jwt.sign({ id: user.id, name: user.name }, SECRET, { expiresIn: "1h" }),

  getUserFromJWT: async (token: string): Promise<User | null> => {
    try {
      const payload = jwt.verify(token, SECRET) as { id: number; name: string };
      const user = mockUsers.find(u => u.id === payload.id);
      return user || null;
    } catch {
      return null;
    }
  },

  isAuthenticated: async (token: string): Promise<boolean> => {
    if (!token) return false;
    try {
      jwt.verify(token, SECRET);
      return true;
    } catch {
      return false;
    }
  },

  getUsers: (): User[] => mockUsers
};

export default mockAuthAdapter;