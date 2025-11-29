const mockUsers = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }, { id: 3, name: "Charlie" }];

const mockAuthAdapter = {
  getUserFromJWT: async (token) => mockUsers[0],
  isAuthenticated: async (token) => !!token
};

export default mockAuthAdapter;