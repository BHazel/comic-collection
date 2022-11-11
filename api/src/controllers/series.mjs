import gremlinClient from '../data/gremlinClient.mjs';

async function getAllSeries(req, res) {
    const { search } = req.query;
    let gremlinQuery = 'g.V().hasLabel("series")';
    if (search) {
        gremlinQuery += `.has('title', TextP.containing('${search}'))`;
    }

    try {
        const dbSeries = await gremlinClient.submit(gremlinQuery, {});
        res.status(200)
            .send(dbSeries);
    } catch (error) {
        res.send(400)
            .send(error);
    }
}

export {
    getAllSeries
};