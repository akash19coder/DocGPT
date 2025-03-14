import Router from "express";
import {
  deleteDocument,
  uploadDocument,
} from "../controllers/document.controllers.js";
import { upload } from "../utils/FileStorage.js";
import { userAuth } from "../middleware/userAuth.js";

const router = Router();

// upload.single("pdfName")
router
  .route("/upload")
  .post(userAuth, upload.single("pdfName"), uploadDocument);
router.route("/delete/:documentID").post(userAuth, deleteDocument);

export default router;
