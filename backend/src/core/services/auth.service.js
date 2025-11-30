/*
* AuthService acts as a bridge between the application and the authentication adapter.
* It provides methods to interact with user authentication processes.
*/
export class AuthService {
  constructor(authAdapter) {
    this.authAdapter = authAdapter;
  }

  extractToken(req) {
    const header = req.headers["authorization"];
    if (!header) return null;

    // Expected: "Bearer token123"
    const [scheme, token] = header.split(" ");

    if (scheme !== "Bearer" || !token) return null;

    return token.trim();
  }

  async getUserFromJWT(token) {
    if (!token) {
      return null;
    }

    return this.authAdapter.getUserFromJWT(token);
  }
}
