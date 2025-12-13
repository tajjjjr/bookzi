import { Request, Response } from "express";
import { ReviewService } from "../../services/review.service.js";

export class ReviewController {
  private reviewService: ReviewService;

  constructor() {
    this.reviewService = new ReviewService();
    this.create = this.create.bind(this);
    this.getProductReviews = this.getProductReviews.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { productId } = req.params;
      const { rating, comment, reviewerName, reviewerEmail } = req.body;
      const userId = req.user!.id;

      if (!rating || rating < 1 || rating > 5) {
        res.status(400).json({ error: "Rating must be between 1 and 5" });
        return;
      }

      const review = await this.reviewService.createReview(userId, productId, {
        rating,
        comment,
        reviewerName,
        reviewerEmail,
      });

      res.status(201).json(review);
    } catch (error) {
      console.error('Create review error:', error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getProductReviews(req: Request, res: Response): Promise<void> {
    try {
      const { productId } = req.params;
      const reviews = await this.reviewService.getProductReviews(productId);
      res.json(reviews);
    } catch (error) {
      console.error('Get reviews error:', error);
      res.status(500).json({ error: "Server error" });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { reviewId } = req.params;
      const { rating, comment } = req.body;
      const userId = req.user!.id;

      const review = await this.reviewService.updateReview(reviewId, userId, {
        rating,
        comment,
      });

      res.json(review);
    } catch (error) {
      console.error('Update review error:', error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { reviewId } = req.params;
      const userId = req.user!.id;

      await this.reviewService.deleteReview(reviewId, userId);
      res.json({ success: true });
    } catch (error) {
      console.error('Delete review error:', error);
      res.status(400).json({ error: (error as Error).message });
    }
  }
}