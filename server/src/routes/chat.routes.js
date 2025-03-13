import Router from "express";
import {
  normalQuery,
  sumarizeQuery,
  definitionSearchQuery,
} from "../controllers/chat.controllers.js";
import { userAuth } from "../middleware/userAuth.js";

const router = Router();

router.route("/chat/normal-reply/:documentId").post(userAuth, normalQuery);
router.route("/chat/summarize/:documentId").post(userAuth, sumarizeQuery);
router
  .route("/chat/definition-search/:documentID")
  .post(userAuth, definitionSearchQuery);

export default router;
