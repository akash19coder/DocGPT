import { getEmbedPrompt } from "../utils/embedDocument.js";
import { queryVectorFromPinecone } from "../utils/pinecone.js";

import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// It will serve normal user query via user prompt
export const normalQuery = async (req, res) => {
  //   const { id } = req.params;
  const prompt = req.body;

  const embedPrompt = await getEmbedPrompt(prompt);
  if (!embedPrompt) {
    throw new Error("Error in embeding prompt");
  }

  // Query Pinecone with embedPrompt
  const queryResponse = await queryVectorFromPinecone(embedPrompt);
  if (!queryResponse) {
    throw new Error("Error querying Pinecone");
  }

  // Feed context and prompt to LLM
  const context = queryResponse.matches
    .map((match) => match.metadata.text)
    .join("\n");
  const chat = await model.startChat();
  const result = await chat.sendMessage(
    `Context: ${context}\n\nQuestion: ${prompt}`,
  );
  const response = await result.response;

  return res.status(200).json({
    answer: response.text(),
  });
};
