# LitRAG

A RAG web app

## Project Structure
```
├── client/                   # React application
│   ├── src/
│   │   ├── App.tsx             # Main React component
│   │   ├── main.tsx            # React entry point
│   ├── package.json            # Frontend dependencies & scripts
│   └── .env                    # Frontend env vars (e.g., REACT_APP_API_BASE_URL)
│
├── server /                    # Node.js + Express backend
│   ├── src/
│   │   ├── vectorize.js        # Batch import all PDFs in /data
│   │   ├── embeddings.js       # Vector store initialization
│   │   └── agent.js            # Task router & AI service calls
│   ├── index.js               # Express setup & routes
│   ├── package.json            # Backend dependencies & scripts
│   └── .env                    # Backend env vars (HF_API_TOKEN, HF_MODEL, etc.)
│
├── chroma_db/                  # Local Chroma vector database files
│   └── *                       # Persisted vector store data
│
├── .gitignore                  # Ignore node_modules, env files, etc.
├── README.md                   # Project documentation
└── docker-compose.yml?         # (Optional) Docker Compose config
```

## set up

### add data
```bash
cd server
node vectorize.js
```

### set up
```bash
npm install
```

### run project
```bash
npm start
```



