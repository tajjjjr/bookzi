import jwt from "jsonwebtoken";
import { AuthAdapter } from "../interfaces/AuthAdapter.ts";
import { User } from "../../types/models.ts";

const SECRET = "mock-secret";

const mockUsers: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", password: "$2b$10$hashedpassword1" },
  { id: 2, name: "Bob", email: "bob@example.com", password: "$2b$10$hashedpassword2" },
  { id: 3, name: "Charlie", email: "charlie@example.com", password: "$2b$10$hashedpassword3" }
];

const mockAuthAdapter: AuthAdapter = {
  signToken: (user: User): string => 
    jwt.sign({ id: user.id, name: user.name, email: user.email }, SECRET, { expiresIn: "1h" }),

  getUserFromJWT: async (token: string): Promise<User | null> => {
    try {
      const payload = jwt.verify(token, SECRET) as { id: number; name: string; email: string };
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