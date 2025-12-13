import { useState } from "react";

interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string; // Used for UI, might map to address logic
  country: string;
  zipCode: string;
  password: string; // Using string based on our previous fix
  confirmPassword: string;
}

export const useRegisterCustomer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (formData: RegisterPayload) => {
    setIsLoading(true);
    setError(null);

    try {
      const backendBaseURL = import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:3000";
      const response = await fetch(`${backendBaseURL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone_number: formData.phone,
          country: formData.country,
          zip_code: formData.zipCode,
          password: formData.password,
        }),
      });

      // --- STEP 1: Check status BEFORE parsing JSON ---
      if (!response.ok) {
        switch (response.status) {
          case 429:
            throw new Error("Too many requests. Please try again later.");
          case 409:
            throw new Error("This email is already registered.");
          case 500:
            throw new Error("Something went wrong. Please try again later.");
          default:
            // For 400 errors, try to get the JSON message if it exists
            try {
              const errorData = await response.json();
              throw new Error(errorData.message || "Registration failed.");
            } catch (jsonErr) {
              // If body isn't JSON, use a generic message
              throw new Error("Please check your registration details.");
            }
        }
      }

      // --- STEP 2: Only parse JSON if response is 200 OK ---
      const data = await response.json();

      localStorage.setItem("customer_token", data.token);
      localStorage.setItem("user_data", JSON.stringify(data.user));

      return data;
    } catch (err: any) {
      // The "Too many requests" error thrown in the switch lands here
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
};