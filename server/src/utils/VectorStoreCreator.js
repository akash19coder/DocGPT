import { loadDocument, splitDocument, embedDocument } from "./documentUtils.js";
import { PineconeStore } from "@langchain/pinecone";
import { pc } from "../config/pinecone-config.js";

// init pinecone   --> Done
// init embeddings --> Done
// check there initalization and API Key errors --> Done

// implement storeDoc --> Done this
// implement splitDoc --> Done
// implement embedDoc --> not implemented
//
export async function storeDocumentInPinecone(namespace, document) {
  const loadedDoc = await loadDocument(); // Load the document
  const splitDocs = await splitDocument(loadedDoc); // Split the document into manageable parts
  const embedDocs = await embedDocument(splitDocs); // Embed the split documents
  console.log(embedDocs);

  await pc.index("docgpt").namespace(namespace).upsert(embedDocs);
}
