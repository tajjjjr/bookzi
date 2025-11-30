import jwt from "jsonwebtoken";
import { AuthAdapter } from "../interfaces/AuthAdapter.ts";
import { User } from "../../types/models.ts";

const SECRET = "mock-secret";

const mockUsers: User[] = [
  { id: "1", name: "Alice", email: "alice@example.com", password: "$2b$10$hashedpassword1" },
  { id: "2", name: "Bob", email: "bob@example.com", password: "$2b$10$hashedpassword2" },
  { id: "3", name: "Charlie", email: "charlie@example.com", password: "$2b$10$hashedpassword3" }
];

const mockAuthAdapter: AuthAdapter = {
  signToken: (user: User): string => 
    jwt.sign({ id: user.id, name: user.name, email: user.email }, SECRET, { expiresIn: "1h" }),

  getUserFromJWT: async (token: string): Promise<User | null> => {
    try {
      const payload = jwt.verify(token, SECRET) as { id: number; name: string; email: string };
      const user = mockUsers.find(u => u.id === String(payload.id));
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

  getUsers: async (): Promise<User[]> => mockUsers,

  getUserById: async (id: string): Promise<User | null> => {
    return mockUsers.find(u => u.id === id) || null;
  },

  getUserByEmail: async (email: string): Promise<User | null> => {
    return mockUsers.find(u => u.email === email) || null;
  },

  userExists: async (id: string): Promise<boolean> => {
    return mockUsers.some(u => u.id === id);
  },

  emailExists: async (email: string): Promise<boolean> => {
    return mockUsers.some(u => u.email === email);
  },

  createUser: async (userData: Omit<User, 'id'>): Promise<User> => {
    const newUser: User = {
      id: String(mockUsers.length + 1),
      ...userData
    };
    mockUsers.push(newUser);
    return newUser;
  },

  updateUser: async (id: string, userData: Partial<Omit<User, 'id' | 'password'>>): Promise<User | null> => {
    const userIndex = mockUsers.findIndex(u => u.id === id);
    if (userIndex === -1) return null;
    
    mockUsers[userIndex] = { ...mockUsers[userIndex], ...userData };
    return mockUsers[userIndex];
  },

  deleteUser: async (id: string): Promise<boolean> => {
    const userIndex = mockUsers.findIndex(u => u.id === id);
    if (userIndex === -1) return false;
    
    mockUsers.splice(userIndex, 1);
    return true;
  },

  validateCredentials: async (email: string, password: string): Promise<User | null> => {
    const user = mockUsers.find(u => u.email === email);
    return (user && user.password === password) ? user : null;
  },

  changePassword: async (userId: string, oldPassword: string, newPassword: string): Promise<boolean> => {
    const user = mockUsers.find(u => u.id === userId);
    if (!user || user.password !== oldPassword) return false;
    
    user.password = newPassword;
    return true;
  },

  resetPassword: async (userId: string, newPassword: string): Promise<boolean> => {
    const user = mockUsers.find(u => u.id === userId);
    if (!user) return false;
    
    user.password = newPassword;
    return true;
  }
};

export default mockAuthAdapter;