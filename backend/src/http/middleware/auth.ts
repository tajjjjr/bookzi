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
      
      if (!authHeader) {
        return res.status(401).json({ 
          success: false,
          error: "Authorization header is required" 
        });
      }

      if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ 
          success: false,
          error: "Invalid authorization format. Use 'Bearer <token>'" 
        });
      }

      const token = authHeader.split(" ")[1];
      
      if (!token) {
        return res.status(401).json({ 
          success: false,
          error: "Token is required" 
        });
      }

      const user = await authService.getUserFromJWT(token);

      if (!user) {
        return res.status(401).json({ 
          success: false,
          error: "Invalid or expired token" 
        });
      }

      if (!user.isActive) {
        return res.status(403).json({ 
          success: false,
          error: "Account is deactivated" 
        });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('Auth middleware error:', error);
      return res.status(401).json({ 
        success: false,
        error: "Authentication failed" 
      });
    }
  };
}