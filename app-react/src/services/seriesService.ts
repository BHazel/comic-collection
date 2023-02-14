import axios from 'axios'

import type { Comic } from '../types/comic';
import type { Series } from '../types/series';

import config from '../config.js';

async function getAllSeries(searchTerm: string = ''): Promise<Series[]> {
    let seriesUrl: string = `${config.api.rootUrl}/series`;
    if (searchTerm) {
        seriesUrl += `?series=${searchTerm}`;
    }

    const { data } = await axios(seriesUrl);
    return data;
}

async function getSeries(seriesId: string): Promise<Series> {
    let seriesUrl: string = `${config.api.rootUrl}/series/${seriesId}`;
    const { data } = await axios(seriesUrl);
    return data;
}

async function getComics(seriesId: string): Promise<Comic[]> {
    let seriesComicsUrl: string = `${config.api.rootUrl}/series/${seriesId}/comics`;
    const { data } = await axios(seriesComicsUrl);
    return data;
}

export {
    getAllSeries,
    getComics,
    getSeries
};