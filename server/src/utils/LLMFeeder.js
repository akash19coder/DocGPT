// import { PromptTemplate } from "@langchain/core/prompts";
// import { StringOutputParser } from "@langchain/core/output_parsers";
// import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
// import { llm } from "../config/gemini-config.js";
// export const feedPromptToGemini = async (vectorEmbeddings) => {
//   const parser = new StringOutputParser();

//   const template = `You are trained on the following pieces of context.Use the following pieces of context to answer the question at the end.Use three sentences maximum and keep the answer as concise as possible. Be straight forward and lil funny when you are pointed on being straightforward.Always say "thanks for asking!" at the end of the answer.

// {context}

// Question: {question}

// Helpful Answer:`;

//   const customRagPrompt = PromptTemplate.fromTemplate(template);

//   const ragChain = await createStuffDocumentsChain({
//     llm,
//     prompt: customRagPrompt,
//     outputParser: new StringOutputParser(),
//   });

//   //   const retrievedDocs = await retriever.invoke(res.text);
//   const ragR = await ragChain.invoke({
//     question: "How long did work in HeadStarterAI as fellow?",
//     context: vectorEmbeddings,
//   });
//   const parserR = await parser.invoke(ragR);
//   console.log(parserR);
// };
