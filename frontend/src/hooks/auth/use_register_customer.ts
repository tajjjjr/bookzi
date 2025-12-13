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

      const data = await response.json();

      if (!response.ok) {
        // Dynamic Error Messaging
        switch (response.status) {
          case 409:
            throw new Error("This email is already registered.");
          case 400:
            throw new Error(data.message || "Please check your registration details.");
          case 500:
            throw new Error("Server error during registration. Please try again later.");
          default:
            throw new Error(data.message || "Registration failed.");
        }
      }

      // Automatically log the user in by saving the returned token/user
      localStorage.setItem("customer_token", data.token);
      localStorage.setItem("user_data", JSON.stringify(data.user));

      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
};