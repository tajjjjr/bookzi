import express from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { AuthService } from "../../services/auth.service.js";

export function createAuthRouter({ authService }: { authService: AuthService }): express.Router {
  const router = express.Router();
  const controller = new AuthController(authService);

  router.post("/login", controller.login);
  router.post("/register", controller.register);

  return router;
}