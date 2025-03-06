// // watch a video on RAG with Pinecone
// // user prompt --> needs to be embedded as well

// import { embeddings } from "../config/embeddings-config.js";
// import { vectorStore } from "../config/pinecone-config.js";
// import { embedDocument } from "../utils/documentUtils.js";
// import { feedPromptToGemini } from "../utils/LLMFeeder.js";

// // how to feed it into vector DB for similarity search --> .query() to query

// // new prompt and llm feeding
// export const normalReply = async (req, res) => {
//   // const { query } = req.body;
//   // const embeddedQuery = await embedDocument([query]);
//   // console.log(embeddedQuery[0].values);
//   // const result = await pc
//   //   .index("docgpt")
//   //   .namespace("a4c1e1e7-a5bc-4e04-b9cb-76f44638bd77")
//   //   .query({
//   //     vector: embeddedQuery[0].values,
//   //     topK: 3,
//   //     includeValues: true,
//   //   });
//   // console.log(result.matches);
//   // //feed the result into llm and get the response and return it
//   // const response = await feedPromptToGemini(result.matches[0].values);
// };

// const simplification = () => {};

// const summarize = () => {};

// const definitionSearch = () => {};
