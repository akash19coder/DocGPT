// import { embeddings } from "../config/embeddings-config.js";
// import { vectorStore } from "../config/pinecone-config.js";
// import { loadDocument, splitDocument } from "./documentUtils.js";

// export async function storeDocumentInPinecone(namespace, document) {
//   const loadedDoc = await loadDocument(); // Load the document
//   const splitDocs = await splitDocument(loadedDoc); // Split the document into manageable parts
//   // const embedDocs = await embedDocument(splitDocs); // Embed the split documents
//   const response = await embeddings.embedDocuments([
//     "i am akash sah. i am going to be hokage",
//     "i am ninja warrior. i am going to become hokage",
//   ]);
//   console.log(" i am the response from embedding model", response);
//   console.log("i am here now");
//   try {
//     await vectorStore.addVectors(response, [
//       "i am akash sah. i am going to be hokage",
//       "i am ninja warrior. i am going to become hokage",
//     ]);
//   } catch (error) {
//     console.log(error);
//   }
// }
