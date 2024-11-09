import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export const loadDocument = async () => {
  console.log("i am entering the game");

  const loader = new PDFLoader("./uploads/Profile.pdf");
  const doc = await loader.load();
  console.log("i am from loadDocument", doc[0].pageContent);
  return doc[0].pageContent;
};
export const splitDocument = async (docs) => {
  console.log("i am not working why?");
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  console.log(textSplitter);
  console.log(docs);

  const allSplits = await textSplitter.splitText(docs);
  console.log(allSplits);
  console.log("i am from splilt document", allSplits);
  return allSplits;
};
export const embedDocument = () => {};
