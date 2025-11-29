import mockAuthAdapter from "../src/adapters/mock/auth.mock.js";

// Pick a user from mock users
const user = { id: 1, name: "Alice" };

// Generate JWT
const token = mockAuthAdapter.signToken(user);

console.log("Mock JWT Token:\n");
console.log(token);
console.log("\nUse this token for authenticated requests in development.");