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
  category: "Case Study" | "Course" | "Guide";
  description: string;
  image: string;
  rating: number;
  reviews: number;
  reviewsList?: Review[];
}

export interface ProductsResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
