import Router from "express";
import { uploadFile } from "../controllers/document.controllers.js";
import { upload } from "../utils/FileStorage.js";

const router = Router();

router.route("/upload").post(upload.single("pdfName"), uploadFile);

export default router;
