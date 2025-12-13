import { useState } from "react";

// Matches your API Response structure
interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

interface LoginPayload {
  email: string;
  password: string;
}

export const useLoginCustomer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (payload: LoginPayload) => {
    setIsLoading(true);
    setError(null);

    try {
        const backendBaseURL = import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:3000";
      const response = await fetch(`${backendBaseURL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // 1. Check if the response actually has content before parsing
      const contentType = response.headers.get("content-type");
      let data = null;
      
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      }

      // 2. Handle non-successful status codes (401, 400, 500, etc.)
if (!response.ok) {
  // If the backend sent a specific error message in the JSON, use it first
  if (data?.message) {
    throw new Error(data.message);
  }

  // Otherwise, fallback to status-code based messages
  switch (response.status) {
    case 401:
      throw new Error("Invalid email or password. Please try again.");
    case 400:
      throw new Error("Please check your input and try again.");
    case 404:
      throw new Error("Account not found. Please register first.");
    case 429:
      throw new Error("Too many attempts. Please try again in a few minutes.");
    case 500:
      throw new Error("Server error. Our team has been notified.");
    default:
      throw new Error("An unexpected error occurred.");
  }
}

      // 3. Success: Store data
      localStorage.setItem("customer_token", data.token);
      localStorage.setItem("user_data", JSON.stringify(data.user));

      return data as LoginResponse;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};