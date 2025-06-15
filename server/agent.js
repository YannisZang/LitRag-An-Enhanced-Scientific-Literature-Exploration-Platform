import 'dotenv/config';
import { ChatAnthropic } from '@langchain/anthropic';
import { createReactAgent } from '@langchain/langgraph/prebuilt';


const llm = new ChatAnthropic({
  model: 'claude-3-5-sonnet-20241022',
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const agent = createReactAgent({
  llm,
  tools: [],
});

const results = await agent.invoke({
  messages:[{
    role: 'user',
    content: 'What is the capital of US?'
  }],
});

console.log(results.messages.at(-1)?.content);