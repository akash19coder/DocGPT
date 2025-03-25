import { Worker } from "bullmq";
import { Chat } from "../models/chat.model.js";
import { Document } from "../models/document.model.js";
import { getEmbedDocument } from "./embedDocument.js";
import { getSplitDocument } from "./splitDocument.js";
import { upsertVectorToPinecone } from "./pinecone.js";
import { getLoadedDocument } from "./loadDocument.js";

import Redis from "ioredis";

//TODO: organize it
export const connection = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  username: "default",
  password: process.env.REDIS_PASSWORD,
  tls: {}, // Use this to enable SSL/TLS
  maxRetriesPerRequest: null, // Set maxRetriesPerRequest to null
});

export const startWorker = async () => {
  const worker = new Worker(
    "document",
    async (job) => {
      console.log("worker has started working...");
      const { filePath, filename, username } = job.data;

      //TODO: convert each util into promises and do then()
      const loadedDocument = await getLoadedDocument(filePath);
      if (!loadedDocument) {
        throw new Error("Unavailabe Loaded Document");
      }
      console.log("i am loaded document", loadedDocument);
      const splitDocument = await getSplitDocument(loadedDocument);
      if (!splitDocument) {
        throw new Error("Unavailable split document");
      }
      console.log("i am split document", splitDocument);
      // 3. embedding document
      const embedDocument = await getEmbedDocument(splitDocument, filename);
      if (!embedDocument) {
        throw new Error("Unavailable embed Document");
      }
      console.log("i am embed", embedDocument);
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
        conversation: [
          { role: "system", content: "How can I help with the document?" },
        ],
      });
    },
    { connection },
  );
};
