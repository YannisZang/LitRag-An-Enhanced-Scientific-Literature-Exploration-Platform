import express from 'express';
import cors from 'cors';
import { buildAgent } from './src/agent.js';

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/generate', async (req, res) => {
    const {query, k = 3, thread_id, modelType } = req.body;
    // console.log(query, thread_id, modelType);

    const agent = buildAgent(modelType);

    // const video_id = "0snEunUacZY";
    // console.log('What is the topic of the paper?');

    try {

        const response = await agent.invoke(
        { 
            messages:[
                {role: 'user', content: query, }
            ],
        }, 
        { configurable: { thread_id, k } }
        );

        const result = response.messages.at(-1)?.content;

        console.log(result);

        res.send(result);

    } catch (error) {
        console.log('Error invoking agent:', error);
        res.status(500).send('Agent invocation failed.');
    }
});

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
