import express from 'express';
import cors from 'cors';
import { agent } from './agent.js';

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/generate', async (req, res) => {
    const { query, doc_id, thread_id } = req.body;
    console.log(query, doc_id, thread_id);

    // const video_id = "0snEunUacZY";
    console.log('What is the topic of the paper?');
    const response1 = await agent.invoke(
    { 
        messages:[
            {role: 'user', content: query, }
        ],
    }, 
    { configurable: { thread_id, doc_id } }
    );

    console.log(response1.messages.at(-1)?.content);

    res.send(response1.messages.at(-1)?.content);
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})

// curl -X POST http://localhost:3000/generate \
//   -H "Content-Type: application/json" \
//   -d '{
//     "query": "What will people learn from this paper?",
//     "video_id": "0snEunUacZY",
//     "thread_id": 1
//     }'
