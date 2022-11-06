import cors from 'cors';
import express from 'express';

import gremlinClient from './data/gremlinClient.mjs';
import { mapDbComic } from './services/dbComicMapper.mjs';

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
        const dbComics = await gremlinClient.submit(gremlinQuery, {});
        const comics = dbComics._items.map(dbComic => {
            return mapDbComic(dbComic);
        });
        
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
        const dbComic = await gremlinClient.submit(gremlinQuery, {});
        const comic = mapDbComic(dbComic._items[0]);

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
        const dbComic = await gremlinClient.submit(gremlinQuery, {});
        const comic = mapDbComic(dbComic._items[0]);

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
        const dbComic = await gremlinClient.submit(gremlinQuery, {});
        const comic = mapDbComic(dbComic._items[0]);
        
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