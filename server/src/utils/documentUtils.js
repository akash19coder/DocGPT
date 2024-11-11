import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { embeddings } from "../config/embeddings-config.js";

export const loadDocument = async () => {
  console.log("i am entering the game");

  const loader = new PDFLoader("./uploads/Profile.pdf");
  const doc = await loader.load();
  console.log("i am from loadDocument", doc[0].pageContent);
  return doc[0].pageContent;
};

export const splitDocument = async (docs) => {
  console.log("i am not working why?");
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  console.log(textSplitter);
  console.log(docs);

  const allSplits = await textSplitter.splitText(docs);
  console.log(allSplits);
  console.log("i am from splilt document", allSplits);
  return allSplits;
};

export const embedDocument = async (textChunks) => {
  try {
    const embeddedChunks = await embeddings.embedDocuments(textChunks);

    // Transform the embedded chunks into the desired format
    const formattedChunks = embeddedChunks.map((embedding, index) => ({
      id: String.fromCharCode(65 + index), // Converts 0 -> 'A', 1 -> 'B', etc.
      values: embedding,
    }));

    return formattedChunks;
  } catch (error) {
    console.error("Error embedding text chunks:", error);
    throw error;
  }
};
