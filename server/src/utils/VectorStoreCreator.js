import { loadDocument, splitDocument, embedDocument } from "./documentUtils.js";
// import { PineconeStore } from "@langchain/pinecone";
import { embeddings } from "../config/embeddings-config.js";
import { configPinecone } from "../config/pinecone-config.js";

// init pinecone   --> Done
// init embeddings --> Done
// check there initalization and API Key errors --> Done

// implement storeDoc --> Done this
// implement splitDoc -->
// implement embedDoc -->

export async function storeDocumentInPinecone(namespace, document) {
  // const pineconeIndex = configPinecone();
  // const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
  //   pineconeIndex,
  //   maxConcurrency: 5,
  //   namespace: namespace,
  // });

  const loadedDoc = await loadDocument(); // Load the document
  const splitDocs = await splitDocument(loadedDoc); // Split the document into manageable parts
  console.log(splitDocs);
  const embedDocs = await embedDocument(splitDocs); // Embed the split documents

  // Upsert embeddings into Pinecone
  await vectorStore.upsert({
    namespace: namespace,
    vectors: embeddings.map((embedding, index) => ({
      id: `${namespace}-${index}`, // Unique ID for each embedding
      values: embedding,
    })),
  });
}
