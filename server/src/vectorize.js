import fs from "fs";
import path from "path";
import 'dotenv/config';
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { Document } from "@langchain/core/documents";
import { addDocumentsToVectorStore } from "./embeddings.js";

/**
 * add all pdf to db
 */
async function loadAllPapersToVectorStore(pdfDir) {
  const files = fs.readdirSync(pdfDir).filter(file => file.endsWith(".pdf"));

  for (const file of files) {
    const fullPath = path.join(pdfDir, file);
    console.log(`📄 Processing: ${file}`);

    // 1️⃣ 加载 PDF
    const loader = new PDFLoader(fullPath);
    let docs = await loader.load();

    // 2️⃣ 构造 metadata
    const newmetadata = {
      title: path.basename(file, ".pdf"),
      total_pages: docs.length,
      import_time: new Date().toISOString(),
    };

    // 3️⃣ 合并全文（或前几页作为摘要）
    const content = docs[0].pageContent
    // const fullText = docs.map(d => d.pageContent).join("\n");
    const doc = new Document({
      pageContent: content,
      metadata: newmetadata,
    });

    // 5️⃣ 存入向量数据库
    await addDocumentsToVectorStore(doc);
    console.log(`✅ ${file} added to vector store with ${doc.length} chunks`);
  }

  console.log("All PDFs processed successfully!");
}

/**
 * 🚀 主执行逻辑
 */
const pdfDirectory = path.resolve("../data");
await loadAllPapersToVectorStore(pdfDirectory);

