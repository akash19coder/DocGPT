import Router from "express";
import { verifyToken } from "../utils/token-manager.js";
import { getUserFromToken } from "../utils/user-decoder.js";
import chatController from "../controllers/chat.controllers.js";
import { postChatMessageToOpenAI } from "../middleware/openAiMiddleware.js";

const chatRouter = Router();

chatRouter.get("/", getUserFromToken,chatController.fetchAllChats)
chatRouter.get("/:chatID",getUserFromToken,chatController.getChatHistory);
chatRouter.post("/:chatID", getUserFromToken, chatController.storeUserChatMessages, postChatMessageToOpenAI);

export default chatRouter;
