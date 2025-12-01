import { Request, Response } from "express";
import { AuthAdapter } from "../../adapters/interfaces/AuthAdapter.ts";

export class AuthController {
  constructor(private authAdapter: AuthAdapter) {
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "Email and password are required" });
        return;
      }

      const user = await this.authAdapter.validateCredentials(email, password);
      if (!user) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      const token = this.authAdapter.signToken(user);
      res.json({ 
        token, 
        user: { 
          id: user.id, 
          name: user.name, 
          email: user.email 
        } 
      });
    } catch {
      res.status(500).json({ error: "Login failed" });
    }
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        res.status(400).json({ error: "Name, email, and password are required" });
        return;
      }

      const emailExists = await this.authAdapter.emailExists(email);
      if (emailExists) {
        res.status(409).json({ error: "Email already exists" });
        return;
      }

      const user = await this.authAdapter.createUser({ name, email, password });
      const token = this.authAdapter.signToken(user);

      res.status(201).json({ 
        token, 
        user: { 
          id: user.id, 
          name: user.name, 
          email: user.email 
        } 
      });
    } catch {
      res.status(500).json({ error: "Registration failed" });
    }
  }
}