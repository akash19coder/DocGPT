import { Chat } from "../models/chat.model.js";
import { Document } from "../models/document.model.js";
import { uploadFileOnCloudinary } from "../utils/cloudinary.js";
import { getEmbedDocument } from "../utils/embedDocument.js";
import { getLoadedDocument } from "../utils/loadDocument.js";
import {
  deleteVectorFromPinecone,
  queryVectorFromPinecone,
  updateVectorInPinecone,
  upsertVectorToPinecone,
} from "../utils/pinecone.js";
import { getSplitDocument } from "../utils/splitDocument.js";
import { getUserUploadedFileName } from "../utils/userUploadedFileName.js";

// import { Queue } from "bullmq";
// import { Worker } from "bullmq";
// import { connection } from "../utils/worker.js";

// const queue = new Queue("document", { connection });

export const uploadDocument = async (req, res) => {
  // 1. Receiving file
  const { originalname } = req.file;
  const username = req.user.username;
  if (!username) {
    return res.status(400).json("Invalid username");
  }

  const fileName = getUserUploadedFileName(username); // update it with req.user.username; using cookies

  const filePath = `${process.cwd()}/data/${username}/${fileName[0]}`;
  if (!filePath) {
    throw new Error("file path invalid");
  }

  // 2. Uploading File To Cloudinary
  const fileUploadResult = await uploadFileOnCloudinary(filePath);

  //TODO: convert each util into promises and do then()
  const loadedDocument = await getLoadedDocument(filePath);
  if (!loadedDocument) {
    throw new Error("Unavailabe Loaded Document");
  }

  const splitDocument = await getSplitDocument(loadedDocument);
  if (!splitDocument) {
    throw new Error("Unavailable split document");
  }

  // 3. embedding document
  const embedDocument = await getEmbedDocument(splitDocument, originalname);
  if (!embedDocument) {
    throw new Error("Unavailable embed Document");
  }

  // 4. Upserting to Pinecone
  const response = await upsertVectorToPinecone(embedDocument, username);
  console.log(response);

  // 5. Create a new document record in MongoDB
  const newDocument = await Document.create({
    name: originalname,
    size: req.file.size,
    cloudinary_url: fileUploadResult.secure_url,
    // Using the generated filename as cloudinary_id
    userId: req.user._id,
  });

  if (!newDocument) {
    throw new Error("Failed to create document record");
  }

  const newChat = await Chat.create({
    userId: req.user._id,
    documentId: newDocument._id,
    conversation: [],
  });

  if (!newChat) {
    throw new Error("Failed to create new chat");
  }

  res.status(200).json(newDocument);
};

export const uploadDocumentQueue = async (req, res) => {
  try {
    const { originalname } = req.file;
    const username = req.user.username;
    if (!username) {
      return res.status(400).json("Invalid username");
    }

    const fileName = getUserUploadedFileName(username); // update it with req.user.username; using cookies

    const filePath = `${process.cwd()}/data/${username}/${fileName[0]}`;
    if (!filePath) {
      throw new Error("file path invalid");
    }
    // 2. Uploading File To Cloudinary
    const result = await uploadFileOnCloudinary(filePath);
    queue.add("documentUpload", {
      filePath: filePath,
      filename: originalname,
      username: username,
    });

    res.status(202).json({
      message: "processing started",
      fileUrl: result.secure_url,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteDocument = async (req, res) => {
  const { documentID } = req.params;

  const { username } = req.user;

  // Fetch document from database
  const document = await Document.findById(documentID);
  if (!document) {
    throw new Error("Document not found");
  }

  // Get PDF name from document
  const pdfName = document.name;

  await deleteVectorFromPinecone(pdfName, username);
};

export const updateDocument = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new Error("Invalid Document Id");
  }

  await updateVectorInPinecone(id);
};
