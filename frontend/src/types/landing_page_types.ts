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
}

export interface HeroSlide {
  id: string;
  headline: string;
  subheadline: string;
  image: string;
  ctaText: string;
}