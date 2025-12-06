import express from "express";
import { AttachmentsController } from "../controllers/attachments.controller.ts";
import { AttachmentAdapter } from "../../adapters/interfaces/AttachmentAdapter.ts";

export function createAttachmentRouter({ 
  attachmentAdapter 
}: { 
  attachmentAdapter: AttachmentAdapter;
}): express.Router {
  const router = express.Router();
  const controller = new AttachmentsController(attachmentAdapter);

  router.post("/upload", controller.uploadFile, controller.handleUpload.bind(controller));
  router.get("/:id", controller.getById.bind(controller));
  router.get("/entity/:entityType/:entityId", controller.getByEntity.bind(controller));
  router.delete("/:id", controller.delete.bind(controller));

  return router;
}