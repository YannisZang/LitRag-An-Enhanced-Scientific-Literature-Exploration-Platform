import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OllamaEmbeddings } from "@langchain/ollama";
import { Document } from '@langchain/core/documents';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

// Option 2: Using Ollama Embeddings
const embedding = new OllamaEmbeddings({
    model: "nomic-embed-text", // or "llama2", "mistral", etc.
    baseUrl: "http://localhost:11434", // default Ollama URL
  });

export const vectorStore = new MemoryVectorStore(embedding);

export const addDocumentsToVectorStore = async (documents) => {

    const { transcript, video_id } = documents;
    const docs = [new Document({ 
        pageContent: transcript,
        metadata: { video_id },
       })];
      
    // splite the video into chunks
    const spiltter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    });
      
    const chunks  = await spiltter.splitDocuments(docs);

    await vectorStore.addDocuments(chunks);
}
