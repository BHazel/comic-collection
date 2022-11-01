import axios from 'axios';

import config from '../config.mjs';

async function getComic(comicId) {
    let comicUrl = `${config.api.rootUrl}/comics/${comicId}`;
    const { data } = await axios(comicUrl);
    return data._items[0];
}

export {
    getComic
};