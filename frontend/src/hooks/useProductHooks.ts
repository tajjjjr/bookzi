import { useState, useEffect } from "react";
import type { UseProductByIdReturn } from "../types/product_page_types";
import type { Product } from "../types/landing_page_types";

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Fetch single product by ID
export const useProductById = (id: string | null): UseProductByIdReturn => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            return;
        }

        const controller = new AbortController();

        setLoading(true);
        setError(null);

        fetch(`${API_BASE}/products/${id}`, {
            signal: controller.signal
        })
            .then(res => {
                if (!res.ok) throw new Error('Product not found');
                return res.json();
            })
            .then(data => {
                setProduct(data);
            })
            .catch(error => {
                if (error.name !== 'AbortError') {
                    setError(error.message);
                }
            })
            .finally(() => setLoading(false));

        return () => controller.abort();
    }, [id]);

    return {
        product,
        loading,
        error
    };
};