#!/bin/bash

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
