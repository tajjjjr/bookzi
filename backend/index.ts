import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import { createRouter } from "./src/http/routes/routes.js";
import { AuthService } from "./src/services/auth.service.js";
import { specs } from "./src/swagger.js";
import { runMigrations, checkMigrationsNeeded } from "./src/db/migrate.js";

const app = express();

// run migrations conditionally
if (await checkMigrationsNeeded()) {
  await runMigrations();
} else {
  console.log("[INFO] No migrations needed\n");
}

// Initialize services
const authService = new AuthService(process.env.JWT_SECRET || "dev-secret");

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static('uploads'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});
app.use('/api', limiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // limit auth attempts
  message: 'Too many authentication attempts'
});
app.use('/api/auth', authLimiter);

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
