import express from "express";
import bodyParser from "body-parser";
import { createRouter } from "./src/http/routes/routes.ts";
import { AuthService } from "./src/services/auth.service.ts";

const { json } = bodyParser;
const app = express();

// Initialize Auth service
const authService = new AuthService(process.env.JWT_SECRET || "dev-secret");

// Middleware
app.use(json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Mount API routes
app.use("/api", createRouter({ authService }));

// Basic health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend Auth server running on http://localhost:${PORT}`);
});