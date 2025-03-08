import Router from "express";
import { getEmbedDocument } from "../utils/embedDocument.js";
import { normalQuery } from "../controllers/chat.controllers.js";

const router = Router();

router.route("/chat").post(normalQuery);

export default router;
