export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  content: string;
  avatar?: string;
}

export interface Product {
  id: string;
  title: string;
  author: string;
  price: number;
  category: 'Case Study' | 'Course' | 'Guide';
  description: string;
  image: string;
  rating: number;
  reviews: number;
  reviewsList?: Review[];
}

export interface HeroSlide {
  id: string;
  headline: string;
  subheadline: string;
  image: string;
  ctaText: string;
}

export interface PendingReview {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  purchaseDate: string;
}