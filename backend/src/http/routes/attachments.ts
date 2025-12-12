import express from "express";
import { AttachmentsController } from "../controllers/attachments.controller.js";

export function createAttachmentRouter(): express.Router {
  const router = express.Router();
  const controller = new AttachmentsController();

  router.post("/upload", controller.uploadFile, controller.handleUpload.bind(controller));
  router.get("/:id", controller.getById.bind(controller));
  router.get("/entity/:entityType/:entityId", controller.getByEntity.bind(controller));
  router.delete("/:id", controller.delete.bind(controller));

  return router;
}