import express from "express";
import { createAuthRouter } from "./auth.ts";
import { createProductRouter } from "./product.ts";
import { createAttachmentRouter } from "./attachments.ts";
import { AuthService } from "../../services/auth.service.js";

const createRouter = ({ 
  authService
}: { 
  authService: AuthService;
}): express.Router => {
  const router = express.Router();

  // API routes
  router.use("/auth", createAuthRouter({ authService }));
  router.use("/products", createProductRouter());
  router.use("/attachments", createAttachmentRouter());
  // TODO: Update order routes in next phase
  // router.use("/orders", createOrderRouter({ db, authAdapter }));

  return router;
};

export { createRouter };