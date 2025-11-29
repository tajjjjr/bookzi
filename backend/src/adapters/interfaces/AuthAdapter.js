export default {
  // Must return true/false or throw. Should not send responses.
  isAuthenticated: async (req) => {
    throw new Error("AuthAdapter.isAuthenticated not implemented");
  },

  // Optional: get user info
  getUser: async (req) => {
    return null;
  }
};
