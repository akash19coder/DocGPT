import OpenAI from "openai";
import configureOpenAI from "../config/openai-config.js";
import ChatHistory from "../models/ChatHistory.js";
const config = configureOpenAI();
const openai = new OpenAI(config);
export const postChatMessageToOpenAI = async (req, res, next) => {
    const chat = await ChatHistory.findOne({ chatID: req.params.chatID });
    const modelResponse = await openai.chat.completions.create({
        messages: chat.conversation,
        model: "gpt-3.5-turbo",
    });
    const userChat = await ChatHistory.findOneAndUpdate({ chatID: req.params.chatID }, { $push: { conversation: modelResponse.choices[0].message } });
    res.status(200).json({ userChat });
};
//# sourceMappingURL=openAiMiddleware.js.map