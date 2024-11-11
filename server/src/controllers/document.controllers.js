import { uploadFileOnCloudinary } from "../utils/FileUploader.js";
import { Chat } from "../models/chathistory.model.js";
import { generateUUID } from "../utils/UUIDGenerator.js";
import { storeDocumentInPinecone } from "../utils/VectorStoreCreator.js";
// import { PineconeStore } from "@langchain/pinecone";
// import { configPinecone } from "../config/pinecone-config.js";
// import { embeddings } from "../config/embeddings-config.js";

export const uploadFile = async (req, res) => {
  //store pdf in FileSystem
  //load,split,embed and store in vector database
  //generate a chatID and send it to frontend
  const { destination, filename } = req.file;
  try {
    const chatId = generateUUID();
    await uploadFileOnCloudinary(req.file);

    await storeDocumentInPinecone(chatId, `${destination}/${filename}`);
    // const pageContent =  await extractPDF(`${destination}/${filename}`);
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

    console.log(chatId);
    const chatHistory = new Chat({ chatId });
    await chatHistory.save();

    res.json({ chatId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
