import mockAuthAdapter from "../../src/adapters/mock/auth.mock.ts";
import { User } from "../../src/adapters/interfaces/AuthAdapter.ts";

// Pick a user from mock users
const user: User = { id: "1", name: "Alice", email: "alice@example.com", password: "" };

// Generate JWT
const token = mockAuthAdapter.signToken(user);

console.log("Mock JWT Token:\n");
console.log(token);
console.log("\nUse this token for authenticated requests in development.");