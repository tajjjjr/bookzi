import express from "express";
import { createAuthRouter } from "./auth.ts";
import { AuthService } from "../../services/auth.service.js";

const createRouter = ({ 
  authService
}: { 
  authService: AuthService;
}): express.Router => {
  const router = express.Router();

  // API routes
  router.use("/auth", createAuthRouter({ authService }));
  // TODO: Update other routes in next phases
  // router.use("/products", createProductRouter({ productAdapter, attachmentAdapter }));
  // router.use("/attachments", createAttachmentRouter({ attachmentAdapter }));
  // router.use("/orders", createOrderRouter({ db, authAdapter }));

  return router;
};

export { createRouter };