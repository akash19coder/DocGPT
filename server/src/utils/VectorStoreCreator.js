import { loadDocument, splitDocument, embedDocument } from "./documentUtils";
// import { PineconeStore } from "@langchain/pinecone";
// import { embeddings } from "../config/embeddings-config.js";
import { configPinecone } from "../config/pinecone-config.js";

async function storeDocumentInPinecone(namespace, document) {
  const pineconeIndex = configPinecone();

  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
    maxConcurrency: 5,
    namespace: namespace,
  });

  const loadedDoc = await loadDocument(document); // Load the document
  const splitDocs = splitDocument(loadedDoc); // Split the document into manageable parts
  const embeddings = await embedDocument(splitDocs); // Embed the split documents

  // Upsert embeddings into Pinecone
  await vectorStore.upsert({
    namespace: namespace,
    vectors: embeddings.map((embedding, index) => ({
      id: `${namespace}-${index}`, // Unique ID for each embedding
      values: embedding,
    })),
  });
}
