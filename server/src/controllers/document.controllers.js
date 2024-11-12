import { uploadFileOnCloudinary } from "../utils/FileUploader.js";
import { Chat } from "../models/chathistory.model.js";
import { generateUUID } from "../utils/UUIDGenerator.js";
import { storeDocumentInPinecone } from "../utils/VectorStoreCreator.js";

export const uploadFile = async (req, res) => {
  const { destination, filename } = req.file;
  try {
    const chatId = generateUUID();

    await uploadFileOnCloudinary(req.file);

    await storeDocumentInPinecone(chatId, `${destination}/${filename}`);

    console.log(chatId);
    const chatHistory = new Chat({ chatId });
    await chatHistory.save();

    res.json({ chatId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteFile = () => {};
export const updateFile = () => {};
