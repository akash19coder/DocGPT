import { Pinecone } from "@pinecone-database/pinecone";

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

await pc.createIndex({
  name: "b",
  dimension: 768,
  spec: {
    serverless: {
      cloud: "aws",
      region: "us-east-1",
    },
  },
});

export { pc };
