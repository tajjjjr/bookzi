import express from "express";
import bodyParser from "body-parser";
import { createRouter } from "../../src/http/routes/routes.ts";
import { SQLiteAdapter } from "../../src/adapters/sqlite/sqlite.adapter.ts";
import { AuthAdapter } from "../../src/adapters/auth/auth.ts";
import { ProductCatalogAdapter } from "../../src/adapters/products/products.ts";
import { LocalAttachmentAdapter } from "../../src/adapters/attachments/local.ts";

const { json } = bodyParser;
const app = express();

// Initialize SQLite adapter
const db = new SQLiteAdapter({
  filepath: "./dev.sqlite"
});

// Initialize Auth adapter with JWT secret and SQLite dependency
const authAdapter = new AuthAdapter(
  process.env.JWT_SECRET || "dev-secret",
  db
);

// Initialize Attachment adapter
const attachmentAdapter = new LocalAttachmentAdapter(db);

// Initialize Product Catalog adapter
const productAdapter = new ProductCatalogAdapter(db, attachmentAdapter);

// Middleware
app.use(json());
app.use('/uploads', express.static('uploads'));

// Mount API routes with all adapters
app.use("/api", createRouter({ db, authAdapter, productAdapter, attachmentAdapter }));

// Basic health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend Auth server running on http://localhost:${PORT}`);
});