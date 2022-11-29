import gremlinClient from '../data/gremlinClient';
import { mapDbComic } from '../services/dbComicMapper';

async function getComics(req, res) {
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
}

async function getComic(req, res) {
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
}

async function getSequelReading(req, res) {
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
}

async function getSequelSeries(req, res) {
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
}

export {
    getComic,
    getComics,
    getSequelReading,
    getSequelSeries
};