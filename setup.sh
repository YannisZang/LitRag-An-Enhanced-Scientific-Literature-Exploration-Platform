#!/bin/bash

# 初始化 Node.js 项目
npm init -y

# 安装 LangChain 所需依赖
npm install \
  @langchain/langgraph \
  @langchain/core \
  @langchain/community \
  @langchain/anthropic \
  zod
