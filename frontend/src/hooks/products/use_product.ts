import { useEffect, useState } from "react";
import type { Product, ProductsResponse } from "../../types/products";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`http://localhost:3000/api/products`);
        if (!res.ok) throw new Error("Failed to fetch products");

        const json: ProductsResponse = await res.json();

        setProducts(json.data);
        setTotal(json.total);
        setPage(json.page);
        setLimit(json.limit);
        setTotalPages(json.totalPages);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return {
    products,
    total,
    page,
    limit,
    totalPages,
    loading,
    error,
  };
}
