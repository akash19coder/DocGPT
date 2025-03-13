import { Document } from "../models/document.model.js";
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

export const uploadDocument = async (req, res) => {
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

  //TODO: convert each util into promises and do then()
  const loadedDocument = await getLoadedDocument(filePath);
  if (!loadedDocument) {
    throw new Error("Unavailabe Loaded Document");
  }

  const splitDocument = await getSplitDocument(loadedDocument);
  if (!splitDocument) {
    throw new Error("Unavailable split document");
  }

  const embedDocument = await getEmbedDocument(splitDocument, originalname);
  if (!embedDocument) {
    throw new Error("Unavailable embed Document");
  }
  const response = await upsertVectorToPinecone(embedDocument, username);
  console.log(response);

  // Create a new document record in MongoDB
  const newDocument = await Document.create({
    name: originalname,
    size: req.file.size,
    // Using the generated filename as cloudinary_id
    userId: req.user._id,
  });

  if (!newDocument) {
    throw new Error("Failed to create document record");
  }
  res.status(200).json(newDocument);
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
