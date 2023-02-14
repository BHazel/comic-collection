type Comic = {
    id: string,
    title: string,
    storyTitle: string,
    issue: number,
    publicationDate: string,
    summary: string,
    url: string,
    imageUrl: string
}

type ComicType = "reading" | "series";

export type {
    Comic,
    ComicType
};