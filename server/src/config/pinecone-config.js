// import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
// import { embeddings } from "./embeddings-config.js";
// import { PineconeStore } from "@langchain/pinecone";

// // const pc = new Pinecone({
// //   apiKey: process.env.PINECONE_API_KEY,
// // });

// const pinecone = new PineconeClient();
// // Will automatically read the PINECONE_API_KEY and PINECONE_ENVIRONMENT env vars
// const pineconeIndex = pinecone.createIndex({
//   name: "b",
//   dimension: 768,
//   spec: {
//     serverless: {
//       cloud: "aws",
//       region: "us-east-1",
//     },
//   },
// });

// export const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
//   pineconeIndex,
//   // Maximum number of batch requests to allow at once. Each batch is 1000 vectors.
//   maxConcurrency: 5,
//   // You can pass a namespace here too
//   // namespace: "foo",
// });
