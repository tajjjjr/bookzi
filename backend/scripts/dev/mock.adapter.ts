import express from "express";
import bodyParser from "body-parser";
import { createRouter } from "../../src/http/routes/routes.ts";
import mockDb from "../../src/adapters/mock/db.mock.ts";
import mockAuth from "../../src/adapters/mock/auth.mock.ts";
import mockProduct from "../../src/adapters/mock/product.mock.ts";
import mockAttachment from "../../src/adapters/mock/attachment.mock.ts";

const { json } = bodyParser;
const app = express();

// Middleware
app.use(json());

// Mount API routes with mocks
app.use("/api", createRouter({ 
  db: mockDb, 
  authAdapter: mockAuth, 
  productAdapter: mockProduct, 
  attachmentAdapter: mockAttachment 
}));

// Basic health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(` Backend test server running on http://localhost:${PORT}`);
});