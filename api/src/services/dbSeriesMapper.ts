function mapDbSeries(dbSeries) {
    let series = {
        id: dbSeries.id,
        title: dbSeries.properties.title[0].value,
        url: dbSeries.properties.url[0].value,
        imageUrl: dbSeries.properties.imageUrl[0].value
    };

    return series;
}

export {
    mapDbSeries
};