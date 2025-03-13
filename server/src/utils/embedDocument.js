import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "text-embedding-004" });

export const getEmbedDocument = async (textChunks, id) => {
  try {
    // Extract just the pageContent from each chunk
    const texts = textChunks.map((chunk) => chunk.pageContent);

    // Get embeddings for all texts
    const embeddingResults = await Promise.all(
      texts.map((text) => model.embedContent(text)),
    );

    // Transform the embedded chunks into the Pinecone format
    const formattedChunks = embeddingResults.map((result, index) => ({
      id: `${id}:chunk_${index}`, // Using more standard ID format
      values: result.embedding.values, // Access the actual embedding array
      metadata: {
        text: texts[index], // Include original text as metadata
      },
    }));
    return formattedChunks;
  } catch (error) {
    console.error("Error embedding text chunks:", error);
    throw error;
  }
};

export const getEmbedPrompt = async (prompt) => {
  try {
    const embeddingResult = await model.embedContent(
      "Nutritional Strategy for Muscle Definition",
    );
    console.log(embeddingResult);
    return embeddingResult.embedding.values;
  } catch (error) {
    console.error("Error embedding prompt:", error);
    throw new Error("Error generating prompt embed");
  }
};
