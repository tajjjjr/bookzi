import express from "express";
import { AuthController, loginValidation, registerValidation } from "../controllers/auth.controller.js";
import { AuthService } from "../../services/auth.service.js";

export function createAuthRouter({ authService }: { authService: AuthService }): express.Router {
  const router = express.Router();
  const controller = new AuthController(authService);

  router.post("/login", loginValidation, controller.login);
  router.post("/register", registerValidation, controller.register);
  router.post("/google", controller.googleLogin);

  return router;
}