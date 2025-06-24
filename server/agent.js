import 'dotenv/config';
import { ChatAnthropic } from '@langchain/anthropic';
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { tool } from '@langchain/core/tools';
import { MemorySaver } from '@langchain/langgraph';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { z } from 'zod';
import path from "node:path";

import { vectorStore, addDocumentsToVectorStore } from './embeddings.js';
// import { HuggingFaceTransformersEmbeddings } from "langchain/community/embeddings/hf_transformers";
// import { OpenAIEmbeddings } from '@langchain/openai';

import data from './data.js';

const video1 = data[0];
const video_id = "0snEunUacZY";

await addDocumentsToVectorStore(video1);

// const pdfPath = "../data/TokenSim.pdf";
// const loader = new PDFLoader(pdfPath);
// const pdf = await loader.load();


// const embedding = new OpenAIEmbeddings({
//   model: "text-embedding-3-small",
//   apiKey: process.env.OPENAI_API_KEY,
// });



// Test the embedding
// const vector = await embedding.embedQuery("Your text string goes here");
// console.log("Embedding vector length:", vector.length);
// console.log("First 5 dimensions:", vector.slice(0, 5));



// retrieve tool

const retrieveTool = tool(async ({query}, { configurable: { video_id }}) => {
  
  console.log('Retrieving docs for query: ----------------');
  console.log(query);
  // console.log(video_id);

  const retrievedDocs = await vectorStore.similaritySearch(query, 3, (doc) => doc.metadata.video_id = video_id );
  const serializedDocs = retrievedDocs.map(doc => doc.pageContent).join('\n');

  console.log('Retrieved docs: ----------------');
  console.log(serializedDocs);

  return serializedDocs;
}, {
  name: 'retrieve',
  description: 'Retrieve the most relevant chunks of text from the uploaded material',
  schema: z.object({
    query: z.string(),
  })
});


const llm = new ChatAnthropic({
  model: 'claude-3-5-sonnet-20241022',
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const checkpointer = new MemorySaver();

const agent = createReactAgent({
  llm,
  tools: [retrieveTool],
  checkpointer,
});

// testing the agent
console.log('What is the leetcode problem?');
const response1 = await agent.invoke(
  {
  messages:[
    {role: 'user', content: 'What is the best way to solve a leetcode problem?'}
  ],
  }, 
  { configurable: { thread_id: 1, video_id } }
);

console.log(response1.messages.at(-1)?.content);

