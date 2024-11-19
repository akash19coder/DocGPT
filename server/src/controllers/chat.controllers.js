// watch a video on RAG with Pinecone
// user prompt --> needs to be embedded as well

import { embeddings } from "../config/embeddings-config.js";
import { pc } from "../config/pinecone-config.js";
import { embedDocument } from "../utils/documentUtils.js";
import { feedPromptToGemini } from "../utils/LLMFeeder.js";

// how to feed it into vector DB for similarity search --> .query() to query

// new prompt and llm feeding
export const normalReply = async (req, res) => {
  const { query } = req.body;
  const embeddedQuery = await embedDocument([query]);
  console.log(embeddedQuery[0].values);
  const result = await pc
    .index("docgpt")
    .namespace("ceac1a73-a3ce-404e-b4e6-e3b3f30af498")
    .query({
      vector: embeddedQuery[0].values,
      topK: 3,
      includeValues: true,
    });
  console.log(result.matches);
  //feed the result into llm and get the response and return it
  const response = await feedPromptToGemini(result.matches);
};

const simplification = () => {};

const summarize = () => {};

const definitionSearch = () => {};
