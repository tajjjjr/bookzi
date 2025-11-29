import jwt from "jsonwebtoken";

const SECRET = "mock-secret";

const mockUsers = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" }
];

const mockAuthAdapter = {
  // Generates a JWT for a given user (for testing)
  signToken: (user) => jwt.sign({ id: user.id, name: user.name }, SECRET, { expiresIn: "1h" }),

  getUserFromJWT: async (token) => {
    try {
      const payload = jwt.verify(token, SECRET);
      return mockUsers.find(u => u.id === payload.id) || null;
    } catch {
      return null;
    }
  },

  isAuthenticated: async (token) => {
    if (!token) return false;
    try {
      jwt.verify(token, SECRET);
      return true;
    } catch {
      return false;
    }
  }
};

export default mockAuthAdapter;