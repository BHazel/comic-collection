import { Request, Response } from 'express';

import type { DbResponse } from '../types/db';
import type { Comic } from '../types/comic';

import gremlinClient from '../data/gremlinClient';
import { mapDbComic } from '../services/dbComicMapper';

async function getComics(req: Request, res: Response): Promise<void> {
    const { search } = req.query;
    let gremlinQuery: string = 'g.V().hasLabel("comic")'
    if (search) {
        gremlinQuery += `.has('title', TextP.containing('${search}'))`;
    }

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

async function getComic(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    let gremlinQuery: string = `g.V("${id}")`;

    try {
        const dbComic: DbResponse = await gremlinClient.submit(gremlinQuery, {});
        const comic: Comic = mapDbComic(dbComic._items[0]);

        res.status(200)
            .send(comic);
    } catch (error) {
        res.status(400)
            .send(error);
    }
}

async function getSequelReading(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    let gremlinQuery: string = `g.V("${id}").out('readingPrequelTo')`;

    try {
        const dbComic: DbResponse = await gremlinClient.submit(gremlinQuery, {});
        const comic: Comic = mapDbComic(dbComic._items[0]);

        res.status(200)
            .send(comic);
    } catch (error) {
        res.status(400)
            .send(error);
    }
}

async function getSequelSeries(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    let gremlinQuery: string = `g.V("${id}").out('seriesPrequelTo')`;
    
    try {
        const dbComic: DbResponse = await gremlinClient.submit(gremlinQuery, {});
        const comic: Comic = mapDbComic(dbComic._items[0]);
        
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