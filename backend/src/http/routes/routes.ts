import express from "express";
import { createProductRouter } from "./product.ts";
import { createOrderRouter } from "./order.ts";
import { createAuthRouter } from "./auth.ts";
import { createAttachmentRouter } from "./attachments.ts";
import { SQLiteAdapter } from "../../adapters/sqlite/sqlite.adapter.ts";
import { AuthAdapter } from "../../adapters/interfaces/AuthAdapter.ts";
import { ProductCatalogAdapter } from "../../adapters/interfaces/ProductCatalogAdapter.ts";
import { AttachmentAdapter } from "../../adapters/interfaces/AttachmentAdapter.ts";

const createRouter = ({ 
  db, 
  authAdapter, 
  productAdapter, 
  attachmentAdapter 
}: { 
  db: SQLiteAdapter; 
  authAdapter: AuthAdapter;
  productAdapter: ProductCatalogAdapter;
  attachmentAdapter: AttachmentAdapter;
}): express.Router => {
  const router = express.Router();

  // API routes
  router.use("/auth", createAuthRouter({ authAdapter }));
  router.use("/products", createProductRouter({ productAdapter, attachmentAdapter }));
  router.use("/attachments", createAttachmentRouter({ attachmentAdapter }));
  router.use("/orders", createOrderRouter({ db, authAdapter }));

  return router;
};

export { createRouter };