import { useEffect, useState } from "react";
import type { Product } from "../../types/products";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null); // Reset error on new fetch

        const res = await fetch(`http://localhost:3000/api/products`, {
          signal: controller.signal 
        });

        if (!res.ok) {
          throw new Error(`Error ${res.status}: Failed to fetch products`);
        }

        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError(err.message || "An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();

    return () => controller.abort(); // Cleanup
  }, []);

  return {
    products,
    loading,
    error,
  };
}