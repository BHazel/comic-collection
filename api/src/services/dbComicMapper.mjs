function mapDbComic(dbComic) {
    let comic = {
        id: dbComic.id,
        title: dbComic.properties.title[0].value,
        storyTitle: dbComic.properties.storyTitle[0].value,
        issue: dbComic.properties.issue[0].value,
        publicationDate: dbComic.properties.publicationDate[0].value,
        summary: dbComic.properties.summary[0].value,
        url: dbComic.properties.url[0].value,
        imageUrl: dbComic.properties.imageUrl[0].value
    };

    return comic;
}

export {
    mapDbComic
};