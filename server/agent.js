import 'dotenv/config';
import { ChatAnthropic } from '@langchain/anthropic';
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { tool } from '@langchain/core/tools';
import { MemorySaver } from '@langchain/langgraph';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { z } from 'zod';
import path from "node:path";

import { vectorStore, addDocumentsToVectorStore } from './embeddings.js';
import { ChatOllama } from '@langchain/ollama';
// import { HuggingFaceTransformersEmbeddings } from "langchain/community/embeddings/hf_transformers";
// import { OpenAIEmbeddings } from '@langchain/openai';


const pdfPath = "../data/AlexNet.pdf";
const pdfLoader = new PDFLoader(pdfPath);
let docs = await pdfLoader.load();

const doc_id = 'AlexNet';

docs = docs.map((doc, i) => {
  doc.doc_id = doc_id;
  // doc.page_id = `page_${i + 1}`;
  return doc;
})

// console.log(docs);

// await addDocumentsToVectorStore(docs[0]);

// const embedding = new OpenAIEmbeddings({
//   model: "text-embedding-3-small",
//   apiKey: process.env.OPENAI_API_KEY,
// });



// Test the embedding
// const vector = await embedding.embedQuery("Your text string goes here");
// console.log("Embedding vector length:", vector.length);
// console.log("First 5 dimensions:", vector.slice(0, 5));


// retrieve tool

const retrieveTool = tool(async ({query, k = 3}) => {
  
  console.log('Retrieving docs for query: ', query);

  // no filter
  const retrievedDocs = await vectorStore.similaritySearch(query, k);
  const serializedDocs = retrievedDocs.map(doc => doc.pageContent).join('\n');

  console.log('Retrieved docs: ----------------');
  console.log(serializedDocs);

  return serializedDocs || "No Results";
}, {
  name: 'retrieve',
  description: 'Retrieve the most relevant chunks of text from the uploaded material',
  schema: z.object({
    query: z.string(),
  })
});


const llm_anthropic = new ChatAnthropic({
  model: 'claude-3-5-sonnet-20241022',
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const llm_mistral = new ChatOllama({
  model: 'mistral',
  baseUrl: "http://localhost:11434",
});

export const buildAgent = (modelType) =>{
  const checkpointer = new MemorySaver();

  let llm;

  if (modelType='mistral') {
    llm = llm_mistral;
  } else if (modelType='anthropic') {
    llm = llm_anthropic;
  }

  return createReactAgent({
    llm,
    tools: [retrieveTool],
    checkpointer,
  });
};


// const checkpointer = new MemorySaver();

// export const agent = createReactAgent({
//   llm,
//   tools: [retrieveTool],
//   checkpointer,
// });

