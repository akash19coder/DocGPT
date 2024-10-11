import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export const extractPDF = async (filePath = "") => {
  const loader = new PDFLoader(filePath);
  const doc = await loader.load();
  return doc[0].pageContent;
};
