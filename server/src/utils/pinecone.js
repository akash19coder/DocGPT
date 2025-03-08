import { Pinecone } from "@pinecone-database/pinecone";
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const index = pinecone.Index("docgpt");
export const upsertVectorToPinecone = async (embeddings) => {
  try {
    // Upsert vectors with namespace per user
    const upsertResponse = await index
      .namespace("userId_1234")
      .upsert(embeddings);
    console.log(upsertResponse);
    return upsertResponse;
  } catch (error) {
    console.error("Error upserting vectors to Pinecone:", error);
    throw error;
  }
};

export const queryVectorFromPinecone = async (queryEmbeddings) => {
  try {
    const queryResponse = await index.namespace("userId_123").query({
      vector: queryEmbeddings,
      topK: 5,
      includeMetadata: true,
    });
    console.log("i am query response", queryResponse.matches);
    return queryResponse;
  } catch (error) {
    console.error("Error querying vectors from Pinecone:", error);
    throw error;
  }
};

export const updateVectorInPinecone = async () => {
  try {
    // Delete existing records with the given id
    await index.delete1({
      filter: {
        metadata: {
          id: id,
        },
      },
    });

    // Insert new records
    const upsertResponse = await index
      .namespace("userId_1233")
      .upsert(embeddings);

    return upsertResponse;
  } catch (error) {
    console.error("Error updating vectors in Pinecone:", error);
    throw error;
  }
};

export const deleteVectorFromPinecone = async (id) => {
  try {
    await index.namespace("userId_123").deleteOne([`pdf-123-chunk_${1}`]);
  } catch (error) {
    console.error("Error deleting document:", error);
    throw new Error("Failed to delete document");
  }
};
