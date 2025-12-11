import express from "express";
import swaggerUi from "swagger-ui-express";
import { createRouter } from "./src/http/routes/routes.js";
import { AuthService } from "./src/services/auth.service.js";
import { specs } from "./src/swagger.js";

const app = express();

// Initialize services
const authService = new AuthService(process.env.JWT_SECRET || "dev-secret");

// Middleware
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// API routes
app.use("/api", createRouter({ authService }));

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Bookzi API server running on http://localhost:${PORT}`);
  console.log(`API documentation: http://localhost:${PORT}/api-docs`);
});