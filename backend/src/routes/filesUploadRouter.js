import express from "express";
import multer from "multer";
import { FileController } from "../controllers/index.js";
const fileUploadPath = new URL("../../data/files", import.meta.url).pathname;
const attachmentStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, fileUploadPath);
  },
  filename: function (_, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const uploadMiddleware = multer({ storage: attachmentStorage }).array(
  "files",
  10
);
export const filesUploadRouter = express
  .Router()
  .post("/upload", uploadMiddleware, FileController.postFileUploadCtrl);
