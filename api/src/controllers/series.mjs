import gremlinClient from '../data/gremlinClient.mjs';

import { mapDbSeries } from '../services/dbSeriesMapper.mjs';

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

export {
    getAllSeries
};