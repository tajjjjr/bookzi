import express from "express";
import { createRouter } from "./src/http/routes/routes.ts";
import { createWebRouter } from "./src/http/routes/web.ts";
import { AuthService } from "./src/services/auth.service.ts";

const app = express();

// Initialize services
const authService = new AuthService(process.env.JWT_SECRET || "dev-secret");

// Middleware
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Web interface
app.use("/", createWebRouter());

// API routes
app.use("/api", createRouter({ authService }));

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Bookzi API server running on http://localhost:${PORT}`);
  console.log(`Admin interface: http://localhost:${PORT}`);
});