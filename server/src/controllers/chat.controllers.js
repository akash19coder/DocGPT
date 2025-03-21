import { Chat } from "../models/chat.model.js";
import { getEmbedPrompt } from "../utils/embedDocument.js";
import { queryVectorFromPinecone } from "../utils/pinecone.js";

import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

export const getChatHistory = async (req, res) => {
  const { documentId } = req.params;

  try {
    const chat = await Chat.findOne({ documentId });
    if (!chat) {
      throw new Error("Chat not found");
    }
    res.status(200).json({
      data: chat.conversation,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: error.message,
    });
  }
};

// It will serve normal user query via user prompt
export const normalQuery = async (req, res) => {
  const { documentId } = req.params;
  const { prompt } = req.body;
  const { username } = req.user;

  try {
    const chathistory = await Chat.findOne({ documentId });
    console.log(chathistory);
    await chathistory.addConversation("user", prompt);

    const embedPrompt = await getEmbedPrompt(prompt);
    if (!embedPrompt) {
      throw new Error("Error in embeding prompt");
    }

    // Query Pinecone with embedPrompt
    const queryResponse = await queryVectorFromPinecone(username, embedPrompt);
    if (!queryResponse) {
      throw new Error("Error querying Pinecone");
    }

    // Feed context and prompt to LLM
    const context = queryResponse.matches
      .map((match) => match.metadata.text)
      .join("\n");

    const chat = model.startChat();
    const result = await chat.sendMessage(
      `Context: ${context}\n\nQuestion: ${prompt}`,
    );

    const response = result.response;

    await chathistory.addConversation("model", response.text());

    return res.status(200).json({
      answer: response.text(),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
};

//Implement definition search and summarize endpoint later on after implementing the frontend part.
export const sumarizeQuery = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new Error("Invalid Document ID");
  }
  //
};

export const definitionSearchQuery = async (req, res) => {};
