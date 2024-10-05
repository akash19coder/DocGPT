import { uploadFileOnCloudinary } from "../utils/FileUploader.js";
import { Chat } from "../models/chathistory.model.js";
import { generateUUID } from "../utils/UUIDGenerator.js";
// import { PineconeStore } from "@langchain/pinecone";
// import { configPinecone } from "../config/pinecone-config.js";
// import { embeddings } from "../config/embeddings-config.js";

export const uploadFile = async (req, res) => {
  //store pdf in FileSystem
  //split,embed and store in vector database
  //generate a chatID and send it to frontend
  try {
    await uploadFileOnCloudinary(req.file);
    // const pdfText = await extractTextFromPDF(req.file);

    // const pineconeIndex = configPinecone();

    // const docs = pdfText
    //   .split("\n")
    //   .map((pageContent) => new Document({ pageContent }));

    // const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    //   pineconeIndex,
    //   // Maximum number of batch requests to allow at once. Each batch is 1000 vectors.
    //   maxConcurrency: 5,
    //   // You can pass a namespace here too
    //   // namespace: "foo",
    // });

    // 4. Generate and return chat ID
    const chatId = generateUUID();
    console.log(chatId);
    const chatHistory = new Chat({ chatId });
    await chatHistory.save();

    res.json({ chatId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
