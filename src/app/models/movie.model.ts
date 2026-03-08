export interface Movie {
    id: number;
    title: string;       
    genre: string;
    score: number;
    runtime: number;
    director: string;
    releaseDate: Date;
    dateAdded: Date;
    status: "watched" | "to-watch"

};


