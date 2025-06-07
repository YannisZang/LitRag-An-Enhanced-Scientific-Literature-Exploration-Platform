# My-AI-Agent

.
├── frontend/                   # React 应用
│   ├── public/
│   │   └── index.html          # HTML 模板
│   ├── src/
│   │   ├── App.js              # 主入口组件
│   │   ├── Chat.js             # 聊天界面组件
│   │   ├── index.js            # React 渲染入口
│   │   └── styles.css          # 样式文件
│   ├── package.json            # 前端依赖和脚本
│   └── .env                    # 前端环境变量（如 API_BASE_URL）

├── backend/                    # Node.js + Express 服务
│   ├── services/               # 业务逻辑层
│   │   ├── llm.js              # HF 文本生成 & OCR & 分类封装
│   │   ├── memory.js           # LangChain 向量存储封装
│   │   └── agent.js            # 根据任务路由和调用 AI 服务
│   ├── server.js               # Express 应用和路由注册
│   ├── package.json            # 后端依赖和脚本
│   └── .env                    # HF_API_TOKEN, HF_MODEL 等

├── chroma_db/                  # 本地向量数据库目录（Chroma 存储）
│   └── *                       # Chroma 持久化文件

├── .gitignore                  # 忽略 node_modules、环境文件等
├── README.md                   # 项目说明文档
└── docker-compose.yml?         # 可选：整体容器化编排
。
