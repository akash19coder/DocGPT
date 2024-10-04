import { uploadFileOnCloudinary } from "../utils/FileUploader.js";
import { Chat } from "../models/chathistory.model.js";
import { generateUUID } from "../utils/UUIDGenerator.js";
export const uploadFile = async (req, res) => {
  //store pdf in FileSystem
  //split,embed and store in vector database
  //generate a chatID and send it to frontend
  try {
    await uploadFileOnCloudinary();
    // // 1. Handle PDF upload and text extraction
    // const pdfText = await extractTextFromPDF(req.file);

    // // 2. Create embeddings
    // const embeddings = new GoogleGenerativeAIEmbeddings();

    // // 3. Store in Pinecone
    // await pinecone.init({
    //   environment: process.env.PINECONE_ENVIRONMENT,
    //   apiKey: process.env.PINECONE_API_KEY,
    // });
    // const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);

    // const docs = pdfText
    //   .split("\n")
    //   .map((pageContent) => new Document({ pageContent }));

    // await PineconeStore.fromDocuments(docs, embeddings, { pineconeIndex });

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
