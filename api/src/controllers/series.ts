import gremlinClient from '../data/gremlinClient';
import { mapDbComic } from '../services/dbComicMapper';

import { mapDbSeries } from '../services/dbSeriesMapper';

async function getAllSeries(req, res) {
    const { search } = req.query;
    let gremlinQuery = 'g.V().hasLabel("series")';
    if (search) {
        gremlinQuery += `.has('title', TextP.containing('${search}'))`;
    }

    try {
        const dbSeries = await gremlinClient.submit(gremlinQuery, {});
        const series = dbSeries._items.map(dbSeries => {
            return mapDbSeries(dbSeries);
        });
        res.status(200)
            .send(series);
    } catch (error) {
        res.send(400)
            .send(error);
    }
}

async function getSeries(req, res) {
    const { id } = req.params;
    let gremlinQuery = `g.V("${id}")`;

    try {
        const dbSeries = await gremlinClient.submit(gremlinQuery, {});
        const series = mapDbSeries(dbSeries._items[0]);

        res.status(200)
            .send(series);
    } catch (error) {
        res.status(400)
            .send(error);
    }
}

async function getComics(req, res) {
    const { id } = req.params;
    let gremlinQuery = `g.V("${id}").in("issuePartOf")`;

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

export {
    getAllSeries,
    getComics,
    getSeries
};