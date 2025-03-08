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
  const fileName = getUserUploadedFileName("akash_sah"); // update it with req.user.username; using cookies

  const filePath = `${process.cwd()}/data/akash_sah/${fileName[0]}`;
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

  const embedDocument = await getEmbedDocument(splitDocument);
  if (!embedDocument) {
    throw new Error("Unavailable embed Document");
  }
  const response = await upsertVectorToPinecone(embedDocument);
  console.log(response);
  res.status(200).json("file saved successfully");
};

export const deleteDocument = async (req, res) => {
  const { id } = req.params;

  await deleteVectorFromPinecone(id);
};

export const updateDocument = async (req, res) => {
  const { id } = req.params;
  await updateVectorInPinecone(id);
};

export const queryDocument = async (req, res) => {
  const { id } = req.params;
  await queryVectorFromPinecone(id, "What is my BMI?");
};
