import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export const getLoadedDocument = async (filepath) => {
  console.log(filepath);
  const loader = new PDFLoader(filepath);
  const doc = await loader.load();

  // console.log("i am pageContent", doc[100].pageContent);
  return doc;
};
