import cors from 'cors';
import express from 'express';

import gremlinClient from './data/gremlinClient.mjs';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.status(200)
        .send('Comic Collection');
});

app.get('/comics', async (req, res) => {
    const { search } = req.query;
    let gremlinQuery = 'g.V().hasLabel("comic")'
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

app.get('/comics/:id', async (req, res) => {
    const { id } = req.params;
    let gremlinQuery = `g.V("${id}")`;

    try {
        const comic = await gremlinClient.submit(gremlinQuery, {});
        res.status(200)
            .send(comic);
    } catch (error) {
        res.status(400)
            .send(error);
    }
});

app.get('/comics/:id/sequel-reading', async (req, res) => {
    const { id } = req.params;
    let gremlinQuery = `g.V("${id}").out('readingPrequelTo')`;

    try {
        const comic = await gremlinClient.submit(gremlinQuery, {});
        res.status(200)
            .send(comic);
    } catch (error) {
        res.status(400)
            .send(error);
    }
});

app.get('/comics/:id/sequel-series', async (req, res) => {
    const { id } = req.params;
    let gremlinQuery = `g.V("${id}").out('seriesPrequelTo')`;
    
    try {
        const comic = await gremlinClient.submit(gremlinQuery, {});
        res.status(200)
            .send(comic);
    } catch (error) {
        res.status(400)
            .send(error);
    }
});

app.listen(8080, () => {
    console.log('Comic Collection API');
    console.log('Server listening on port 8080...');
});