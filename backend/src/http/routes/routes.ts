import express from "express";
import { createAuthRouter } from "./auth.js";
import { createProductRouter } from "./product.js";
import { createAttachmentRouter } from "./attachments.js";
import { createOrderRouter } from "./order.js";
import { createReviewRouter } from "./reviews.js";
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
  router.use("/orders", createOrderRouter({ authService }));
  router.use("/reviews", createReviewRouter({ authService }));

  return router;
};

export { createRouter };