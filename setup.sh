#!/bin/bash

cd server
echo "📦 Installing server dependencies..."
# initialize Node.js project
npm init -y

# install LangChain dependencies
npm install \
  @langchain/langgraph \
  @langchain/core \
  @langchain/community \
  @langchain/anthropic \
  @langchain/ollama \
  zod

cd ../client
echo "📦 Installing client dependencies..."

