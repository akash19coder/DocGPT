import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export const getSplitDocument = async (docs) => {
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 200,
  });

  // Process each document and split the text
  const transformedSplits = [];
  for (const doc of docs) {
    const splits = await textSplitter.splitText(doc.pageContent); // Assume `text` is the property containing the string
    splits.forEach((text) => {
      transformedSplits.push({ pageContent: text });
    });
  }

  return transformedSplits;
};
