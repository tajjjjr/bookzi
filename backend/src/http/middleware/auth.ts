import { Request, Response, NextFunction } from "express";
import { AuthService } from "../../services/auth.service.js";
import { users } from "../../db/schema.js";

declare global {
  namespace Express {
    interface Request {
      user?: typeof users.$inferSelect;
    }
  }
}

export function authMiddleware(authService: AuthService) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers["authorization"];
      if (!authHeader) return res.status(401).json({ error: "Unauthorized" });

      const token = authHeader.split(" ")[1]; // Bearer <token>
      const user = await authService.getUserFromJWT(token);

      if (!user) return res.status(401).json({ error: "Unauthorized" });

      req.user = user;
      next();
    } catch {
      return res.status(401).json({ error: "Invalid token" });
    }
  };
}