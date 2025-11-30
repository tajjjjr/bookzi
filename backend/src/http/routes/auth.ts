import express from "express";
import { AuthController } from "../controllers/auth.controller.ts";
import { AuthAdapter } from "../../adapters/interfaces/AuthAdapter.ts";

export function createAuthRouter({ authAdapter }: { authAdapter: AuthAdapter }): express.Router {
  const router = express.Router();
  const controller = new AuthController(authAdapter);

  router.post("/login", controller.login);
  router.post("/register", controller.register);

  return router;
}