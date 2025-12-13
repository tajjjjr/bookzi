import express from "express";
import { ReviewController } from "../controllers/review.controller.js";
import { authMiddleware } from "../middleware/auth.js";
import { AuthService } from "../../services/auth.service.js";

export function createReviewRouter({ authService }: { authService: AuthService }): express.Router {
  const router = express.Router();
  const controller = new ReviewController();

  // Get reviews for a product (public)
  router.get("/product/:productId", controller.getProductReviews);
  
  // Create review for a product (protected)
  router.post("/product/:productId", authMiddleware(authService), controller.create);
  
  // Update review (protected)
  router.put("/:reviewId", authMiddleware(authService), controller.update);
  
  // Delete review (protected)
  router.delete("/:reviewId", authMiddleware(authService), controller.delete);

  return router;
}