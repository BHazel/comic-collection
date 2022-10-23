import cors from 'cors';
import express from 'express';

import gremlinClient from './data/gremlinClient.mjs';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.status(200)
        .send('Comic Collection');
});

app.get('/comics', async(req, res) => {
    let gremlinQuery = 'g.V().hasLabel("comic")'
    const { search } = req.query;
    if (search) {
        gremlinQuery += `.has('title', TextP.containing('${search}'))`;
    }

    try {
        const comics = await gremlinClient.submit(gremlinQuery, {});
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