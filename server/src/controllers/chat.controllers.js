import { Request, Response, NextFunction } from "express";
import OpenAI from "openai";
import User from "../models/user.model.js";
import ChatHistory from "../models/chathistory.model.js";

// const openai = new OpenAI();

class chatController {
  static getChatHistory = async (
    req: Request,
    res: Response,
    next: NextFunction,    
  ) => {
    try {
      const chathistory = await ChatHistory.findOne({
        chatID: req.params.chatID,
      });
      res.status(200).json(chathistory);
    } catch (error) {
      console.log(error.message);
    }
  };

  static storeUserChatMessages = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data = {
        role: "user",
        content: req.body.message,
      };

      const user = await ChatHistory.findOneAndUpdate(
        { chatID: req.params.chatID },
        { $push: { conversation: data } },
        { new: true },
      );
      next();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  
  static fetchAllChats = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const allChat = await ChatHistory.find({userId: req.locals.id});
    res.status(200).json({allChat});
  };

}
export default chatController;
