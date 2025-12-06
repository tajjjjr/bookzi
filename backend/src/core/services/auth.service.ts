import { User, AuthAdapter } from "../../adapters/interfaces/AuthAdapter.ts";
import { Request } from "express";

export class AuthService {
  constructor(private authAdapter: AuthAdapter) {}

  extractToken(req: Request): string | null {
    const header = req.headers["authorization"];
    if (!header) return null;

    const [scheme, token] = header.split(" ");
    if (scheme !== "Bearer" || !token) return null;

    return token.trim();
  }

  async getUserFromJWT(token: string): Promise<User | null> {
    if (!token) {
      return null;
    }

    return this.authAdapter.getUserFromJWT(token);
  }
}