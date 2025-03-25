import Router from "express";
import {
  deleteDocument,
  uploadDocument,
  uploadDocumentQueue,
} from "../controllers/document.controllers.js";
import { upload } from "../utils/FileStorage.js";
import { userAuth } from "../middleware/userAuth.js";

const router = Router();

// upload.single("pdfName")
router
  .route("/upload")
  .post(userAuth, upload.single("pdfName"), uploadDocument);

router
  .route("/upload-queue")
  .post(userAuth, upload.single("pdfName"), uploadDocumentQueue);

router.route("/delete/:documentID").post(userAuth, deleteDocument);

export default router;
