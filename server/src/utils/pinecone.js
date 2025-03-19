import { Pinecone } from "@pinecone-database/pinecone";

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const index = pinecone.Index("docgpt");

//Upsert new records related to chunks of document
export const upsertVectorToPinecone = async (embeddings, namespace) => {
  try {
    // Upsert vectors with namespace per user
    const upsertResponse = await index.namespace(namespace).upsert(embeddings);
    console.log(upsertResponse);
    return upsertResponse;
  } catch (error) {
    console.error("Error upserting vectors to Pinecone:", error);
    throw error;
  }
};

//Queries new records related to chunks of document
export const queryVectorFromPinecone = async (namespace, queryEmbeddings) => {
  try {
    const queryResponse = await index.namespace(namespace).query({
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

//Updates new records related to chunks of document
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

//Delete new records related to chunks of document
export const deleteVectorFromPinecone = async (pdfName, namespace) => {
  try {
    let pageOneList = await index.listPaginated({ prefix: pdfName });
    while (pageOneList.pagination.next) {
      // get all ids of records
      const pageOneVectorIds = pageOneList.vectors.map((vector) => vector.id);

      // delete them
      await index.deleteMany(pageOneVectorIds);

      // fetch the next page
      pageOneList = await index.listPaginated({
        prefix: pdfName,
        pagination: pageOneList.pagination.next,
      });
    }
  } catch (error) {
    console.error("Error deleting document:", error);
    throw new Error("Failed to delete document");
  }
};
