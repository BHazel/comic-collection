import { Request, Response } from 'express';

import type { DbResponse } from '../types/db';
import type { Comic } from '../types/comic';
import type { Series } from '../types/series';

import gremlinClient from '../data/gremlinClient';
import { mapDbComic } from '../services/dbComicMapper';
import { mapDbSeries } from '../services/dbSeriesMapper';

async function getAllSeries(req: Request, res: Response): Promise<void> {
    const { search } = req.query;
    let gremlinQuery: string = 'g.V().hasLabel("series")';
    if (search) {
        gremlinQuery += `.has('title', TextP.containing('${search}'))`;
    }

    try {
        const dbSeries: DbResponse = await gremlinClient.submit(gremlinQuery, {});
        const series: Series[] = dbSeries._items.map(dbSeries => {
            return mapDbSeries(dbSeries);
        });
        res.status(200)
            .send(series);
    } catch (error) {
        res.send(400)
            .send(error);
    }
}

async function getSeries(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    let gremlinQuery: string = `g.V("${id}")`;

    try {
        const dbSeries: DbResponse = await gremlinClient.submit(gremlinQuery, {});
        const series: Series = mapDbSeries(dbSeries._items[0]);

        res.status(200)
            .send(series);
    } catch (error) {
        res.status(400)
            .send(error);
    }
}

async function getComics(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    let gremlinQuery: string = `g.V("${id}").in("issuePartOf")`;

    try {
        const dbComics: DbResponse = await gremlinClient.submit(gremlinQuery, {});
        const comics: Comic[] = dbComics._items.map(dbComic => {
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