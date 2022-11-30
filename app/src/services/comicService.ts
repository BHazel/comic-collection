import axios from 'axios';

import config from '../config.js';

async function getComics(searchTerm = '') {
    let comicsUrl = `${config.api.rootUrl}/comics`;
    if (searchTerm) {
        comicsUrl += `?search=${searchTerm}`;
    }

    const { data } = await axios(comicsUrl);
    return data;
}

async function getComic(comicId) {
    let comicUrl = `${config.api.rootUrl}/comics/${comicId}`;
    const { data } = await axios(comicUrl);
    return data;
}

async function getSequel(comicId, type) {
    if (type !== 'series' && type !== 'reading') {
        return;
    }

    let sequelUrl = `${config.api.rootUrl}/comics/${comicId}/sequel-${type}`;
    const { data } = await axios(sequelUrl);
    return data;
}

export {
    getComic,
    getComics,
    getSequel
};