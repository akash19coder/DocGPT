// import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// import { embeddings } from "../config/embeddings-config.js";

// export const documentLoader = async () => {
//   const loader = new PDFLoader("./akashsah/akashsah.pdf");
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
//   console.log("i am transformed splits", transformedSplits);

//   return transformedSplits;
// };

// export const embedDocument = async (textChunks) => {
//   try {
//     // First, extract just the text content from the chunks
//     const texts = textChunks.map((chunk) => chunk.pageContent);

//     // Get embeddings for all texts
//     const embeddedChunks = await embeddings.embedDocuments(texts);

//     // Format for Pinecone - each record needs id, values, and metadata
//     const formattedChunks = embeddedChunks.map((embedding, index) => ({
//       id: `chunk_${index}`, // More robust ID format
//       values: embedding,
//       metadata: {
//         text: texts[index], // Store original text as metadata
//       },
//     }));

//     return formattedChunks;
//   } catch (error) {
//     console.error("Error embedding text chunks:", error);
//     throw error;
//   }
// };
