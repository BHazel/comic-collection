import axios from 'axios'

import config from '../config.mjs';

async function getAllSeries(searchTerm = '') {
    let seriesUrl = `${config.api.rootUrl}/series`;
    if (searchTerm) {
        seriesUrl += `?series=${searchTerm}`;
    }

    const { data } = await axios(seriesUrl);
    return data;
}

async function getSeries(seriesId) {
    let seriesUrl = `${config.api.rootUrl}/series/${seriesId}`;
    const { data } = await axios(seriesUrl);
    return data;
}

export {
    getAllSeries,
    getSeries
};