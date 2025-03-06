// import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// import { embeddings } from "../config/embeddings-config.js";

// export const loadDocument = async () => {
//   const loader = new PDFLoader("./uploads/programmer.pdf");
//   const doc = await loader.load();

//   // console.log("i am pageContent", doc[100].pageContent);
//   return doc;
// };

// export const splitDocument = async (docs) => {
//   const textSplitter = new RecursiveCharacterTextSplitter({
//     chunkSize: 1000,
//     chunkOverlap: 200,
//   });

//   const start = Date.now();

//   // Process each document and split the text
//   const transformedSplits = [];
//   for (const doc of docs) {
//     const splits = await textSplitter.splitText(doc.pageContent); // Assume `text` is the property containing the string
//     splits.forEach((text) => {
//       transformedSplits.push({ pageContent: text });
//     });
//   }

//   const end = Date.now();
//   console.log("Time taken to perform split operation -", end - start);
//   // console.log("i am transformed splits", transformedSplits);

//   return transformedSplits;
// };

// export const embedDocument = async (textChunks) => {
//   try {
//     const embeddedChunks = await embeddings.embedDocuments(textChunks);

//     // Transform the embedded chunks into the desired format
//     const formattedChunks = embeddedChunks.map((embedding, index) => ({
//       id: String.fromCharCode(65 + index), // Converts 0 -> 'A', 1 -> 'B', etc.
//       values: embedding,
//     }));

//     return formattedChunks;
//   } catch (error) {
//     console.error("Error embedding text chunks:", error);
//     throw error;
//   }
// };
