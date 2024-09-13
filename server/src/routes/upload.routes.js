import Router from "express";
import { uploadFile } from "../controllers/document.controllers";

const router = Router();

router.route("/upload").post(uploadFile);

export default router;
