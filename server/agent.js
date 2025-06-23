import 'dotenv/config';
import { ChatAnthropic } from '@langchain/anthropic';
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { Document } from '@langchain/core/documents';
// import { OpenAIEmbeddings } from '@langchain/openai';
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OllamaEmbeddings } from "@langchain/ollama";
import { tool } from '@langchain/core/tools';
import { z } from 'zod';
// import { HuggingFaceTransformersEmbeddings } from "langchain/community/embeddings/hf_transformers";



import data from './data.js';

const video1 = data[0];

const docs = [new Document({ 
  pageContent: video1.transcript,
  metadata: {video_id: video1.video_id}
 })];

// splite the video into chunks
const spiltter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
 
});

const chunks  = await spiltter.splitDocuments(docs);

// console.log(chunks);

// embed the chunks

// const embedding = new OpenAIEmbeddings({
//   model: "text-embedding-3-small",
//   apiKey: process.env.OPENAI_API_KEY,
// });

// Option 2: Using Ollama Embeddings
const embedding = new OllamaEmbeddings({
  model: "nomic-embed-text", // or "llama2", "mistral", etc.
  baseUrl: "http://localhost:11434", // default Ollama URL
});

// Test the embedding
// const vector = await embedding.embedQuery("Your text string goes here");
// console.log("Embedding vector length:", vector.length);
// console.log("First 5 dimensions:", vector.slice(0, 5));

// store embedding vectors

const vectorStore = new MemoryVectorStore(embedding);

await vectorStore.addDocuments(chunks);

// create the most relevant chunks

// const retrievedDocs = await vectorStore.similaritySearch("what is the best way to solve a backtracking problem?", 3);

// console.log(retrievedDocs);

// retrieve tool

const retrieveTool = tool(async ({query}) => {
  console.log('Retrieving docs for query: ----------------');
  console.log(query);

  const retrievedDocs = await vectorStore.similaritySearch(query, 3);
  const serializedDocs = retrievedDocs.map(doc => doc.pageContent).join('\n');

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

const agent = createReactAgent({
  llm,
  tools: [retrieveTool],
});

const results = await agent.invoke({
  messages:[
    {role: 'user', content: 'What is the best way to solve a backtracking problem?'}
  ],
});

console.log(results.messages.at(-1)?.content);