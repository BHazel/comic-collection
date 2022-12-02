import type { Comic } from './comic';
import type { Series } from './series';

type ComicCollectionContext = {
    comics: Comic[],
    series: Series[]
}

export type {
    ComicCollectionContext
};