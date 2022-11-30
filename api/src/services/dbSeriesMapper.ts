import type { DbEntity } from '../types/db';
import type { Series } from '../types/series';

function mapDbSeries(dbSeries: DbEntity): Series {
    let series: Series = {
        id: dbSeries.id,
        title: dbSeries.properties.title[0].value as string,
        url: dbSeries.properties.url[0].value as string,
        imageUrl: dbSeries.properties.imageUrl[0].value as string
    };

    return series;
}

export {
    mapDbSeries
};