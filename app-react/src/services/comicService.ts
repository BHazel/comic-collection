import axios from 'axios';

import type { Comic, ComicType } from '../types/comic';

import config from '../config.js';

async function getComics(searchTerm: string = ''): Promise<Comic[]> {
    let comicsUrl: string = `${config.api.rootUrl}/comics`;
    if (searchTerm) {
        comicsUrl += `?search=${searchTerm}`;
    }

    const { data } = await axios(comicsUrl);
    return data;
}

async function getComic(comicId: string): Promise<Comic> {
    let comicUrl: string = `${config.api.rootUrl}/comics/${comicId}`;
    const { data } = await axios(comicUrl);
    return data;
}

async function getSequel(comicId: string, type: ComicType): Promise<Comic> {
    if (type !== 'series' && type !== 'reading') {
        return undefined;
    }

    let sequelUrl: string = `${config.api.rootUrl}/comics/${comicId}/sequel-${type}`;
    const { data } = await axios(sequelUrl);
    return data;
}

export {
    getComic,
    getComics,
    getSequel
};