import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OllamaEmbeddings } from "@langchain/ollama";
import { Document } from '@langchain/core/documents';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { PGVectorStore } from '@langchain/community/vectorstores/pgvector';

// Option 2: Using Ollama Embeddings
const embedding = new OllamaEmbeddings({
    model: "nomic-embed-text", // or "llama2", "mistral", etc.
    baseUrl: "http://localhost:11434", // default Ollama URL
  });

// PGvector
const vectorStore = new PGVectorStore.initialize(embedding, {
    postgresConnectionOptions: {
        connectionString: process.env.DB_URL,
    },
    tableName: 'vector_store',
    columns: {
        idColumnName: 'id',
        vectorColumnName: 'vector',
        contentColumnName: 'content',
        metadataColumnName: 'metadata',
    },
    distanceStrategy: 'cosine',
})

// export const vectorStore = new MemoryVectorStore(embedding);

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
