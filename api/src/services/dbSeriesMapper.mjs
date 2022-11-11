function mapDbSeries(dbSeries) {
    let series = {
        id: dbSeries.id,
        title: dbSeries.properties.title[0].value
    };

    return series;
}

export {
    mapDbSeries
};