import cors from 'cors';
import express from 'express';

import gremlinClient from './data/gremlinClient.mjs';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.status(200)
        .send('Hello, World!');
});

app.get('/comics', async(req, res) => {
    try {
        const comics = await gremlinClient.submit('g.V()', {});
        res.status(200)
            .send(comics);
    } catch (error) {
        res.status(400)
            .send(error);
    }
});

app.listen(8080, () => {
    console.log('Comic Collection API');
    console.log('Server listening on port 8080...');
});