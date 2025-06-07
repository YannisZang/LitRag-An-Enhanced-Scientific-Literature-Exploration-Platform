# My-AI-Agent

## Project Structure
```
.
├── frontend/                   # React application
│   ├── public/
│   │   └── index.html          # HTML template
│   ├── src/
│   │   ├── App.js              # Main React component
│   │   ├── Chat.js             # Chat interface component
│   │   ├── index.js            # React entry point
│   │   └── styles.css          # Styles
│   ├── package.json            # Frontend dependencies & scripts
│   └── .env                    # Frontend env vars (e.g., REACT_APP_API_BASE_URL)
│
├── backend/                    # Node.js + Express backend
│   ├── services/
│   │   ├── llm.js              # HF model wrappers (text gen, OCR, classification)
│   │   ├── memory.js           # LangChain vector store wrapper
│   │   └── agent.js            # Task router & AI service calls
│   ├── server.js               # Express setup & routes
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
