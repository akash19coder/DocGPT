import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
const pinecone = new PineconeClient();

export const configPinecone = () => {
  const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);

  return pineconeIndex;
};
