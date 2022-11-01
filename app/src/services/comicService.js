import axios from 'axios';

import config from '../config.mjs';

async function getComics(searchTerm = '') {
    let comicsUrl = `${config.api.rootUrl}/comics`;
    if (searchTerm) {
        comicsUrl += `?search=${searchTerm}`;
    }

    const { data } = await axios(comicsUrl);
    return data._items;
}

async function getComic(comicId) {
    let comicUrl = `${config.api.rootUrl}/comics/${comicId}`;
    const { data } = await axios(comicUrl);
    return data._items[0];
}

export {
    getComic,
    getComics
};