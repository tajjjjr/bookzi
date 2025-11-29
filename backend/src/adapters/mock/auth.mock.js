const mockUsers = [{ id: 1, name: "Alice" }];

const mockAuthAdapter = {
  getUserFromJWT: async (token) => mockUsers[0],
  isAuthenticated: async (token) => !!token
};

export default mockAuthAdapter;