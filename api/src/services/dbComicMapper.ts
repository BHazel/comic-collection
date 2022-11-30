import type { Comic } from '../types/comic';
import type { DbEntity } from '../types/db';

function mapDbComic(dbComic: DbEntity): Comic {
    let comic: Comic = {
        id: dbComic.id,
        title: dbComic.properties.title[0].value as string,
        storyTitle: dbComic.properties.storyTitle[0].value as string,
        issue: dbComic.properties.issue[0].value as number,
        publicationDate: dbComic.properties.publicationDate[0].value as string,
        summary: dbComic.properties.summary[0].value as string,
        url: dbComic.properties.url[0].value as string,
        imageUrl: dbComic.properties.imageUrl[0].value as string
    };

    return comic;
}

export {
    mapDbComic
};