import { randomUUID } from 'crypto';
import { ReviewRepository, OrderRepository } from '../repositories/index.js';

export class ReviewService {
  private reviewRepo: ReviewRepository;
  private orderRepo: OrderRepository;

  constructor() {
    this.reviewRepo = new ReviewRepository();
    this.orderRepo = new OrderRepository();
  }

  async canUserReviewProduct(userId: string, productId: string): Promise<boolean> {
    // Check if user has purchased this product
    const userOrders = await this.orderRepo.findByUserId(userId);
    
    for (const order of userOrders) {
      const items = JSON.parse(order.items);
      const hasPurchased = items.some((item: { productId: string }) => item.productId === productId);
      if (hasPurchased) return true;
    }
    
    return false;
  }

  async createReview(userId: string, productId: string, reviewData: { rating: number; comment?: string; reviewerName: string; reviewerEmail?: string }) {
    // Check if user can review this product
    const canReview = await this.canUserReviewProduct(userId, productId);
    if (!canReview) {
      throw new Error('You can only review products you have purchased');
    }

    // Check if user already reviewed this product
    const existingReview = await this.reviewRepo.findByUserAndProduct(userId, productId);
    if (existingReview) {
      throw new Error('You have already reviewed this product');
    }

    const now = new Date().toISOString();
    return await this.reviewRepo.create({
      id: randomUUID(),
      productId,
      userId,
      rating: reviewData.rating,
      comment: reviewData.comment || null,
      reviewerName: reviewData.reviewerName,
      reviewerEmail: reviewData.reviewerEmail || null,
      isVerified: true, // Since they purchased it
      createdAt: now,
      updatedAt: now,
    });
  }

  async getProductReviews(productId: string) {
    return await this.reviewRepo.findByProductId(productId);
  }

  async updateReview(reviewId: string, userId: string, reviewData: { rating?: number; comment?: string }) {
    const review = await this.reviewRepo.findById(reviewId);
    if (!review || review.userId !== userId) {
      throw new Error('Review not found or unauthorized');
    }

    const updatedData = {
      ...reviewData,
      updatedAt: new Date().toISOString(),
    };
    
    return await this.reviewRepo.update(reviewId, updatedData);
  }

  async deleteReview(reviewId: string, userId: string) {
    const review = await this.reviewRepo.findById(reviewId);
    if (!review || review.userId !== userId) {
      throw new Error('Review not found or unauthorized');
    }

    await this.reviewRepo.delete(reviewId);
    return true;
  }
}