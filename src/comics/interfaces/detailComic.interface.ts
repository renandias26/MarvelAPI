export interface detailComic {
    id: number,
    title: string,
    description: string,
    format: string,
    dates: {
        type: string,
        date: Date
    }
    thumbnail: {
        path: string,
        extension: string
    }
}