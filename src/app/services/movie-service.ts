import { Injectable } from '@angular/core';
import { Movie } from '../models/movie.model';


@Injectable({
  providedIn: 'root',
})
export class MovieService {    //Responsabilidade deste service: gerir a entidade Movie

  private readonly storageKey = 'movies'; 

  /* constructor() {} */

  private loadFromStorage(): Movie[] {
    const data = localStorage.getItem(this.storageKey); //getItem pode dar string ou null

    if (!data) {
      this.seedData();
      return this.loadFromStorage();
    };
    
  
    const dataParsed: Movie[] = JSON.parse(data); //converte JSON em objeto JS manipulável

    return dataParsed.map(movie => ({
      ...movie, 
      releaseDate: new Date(movie.releaseDate),
      dateAdded: new Date(movie.dateAdded)  //voltar a converter datas de string para Date
    }))
  }


  private saveToStorage(movies: Movie[]): void {

    const moviesJSON = JSON.stringify(movies); //converte objeto JS em formato JSON(string)
    localStorage.setItem(this.storageKey, moviesJSON);

  }
  

  //CRUD:
  //ir sempre buscar ao localStorage, em vez de trabalhar com estado em memória, para manter persistência e consistência
  

  getAllMovies(): Movie[] {  

    return this.loadFromStorage();
  };

  getMovieById(id: number): Movie | undefined {
    const movies = this.loadFromStorage();
    return movies.find((movie) => movie.id === id);
  }


  addMovie(movie: Movie): void {

    const movies = this.loadFromStorage();
    movies.push(movie);
    this.saveToStorage(movies);
  };

  updateMovie(movieUpdated: Movie): void {

    const movies = this.loadFromStorage();
    const moviesUpdated = movies.map(movie => movie.id === movieUpdated.id ? movieUpdated : movie); //Podia fazer com findIndex tmb
    this.saveToStorage(moviesUpdated);

  };

  deleteMovie(movieId: number): void {

    const movies = this.loadFromStorage();
    const moviesUpdated = movies.filter(movie => movie.id !== movieId);
    this.saveToStorage(moviesUpdated);

  }

  //KPIs

  getTotalMovies(): number {

    return this.loadFromStorage().length;
  };

  getWatchedCount(): number {

    const watchedMovies = this.loadFromStorage().filter(movie => movie.status === "watched");
    return watchedMovies.length;

  };

  getAverageScore(): number {

    const watchedMovies = this.loadFromStorage().filter(movie => movie.status === "watched");

    if (watchedMovies.length === 0) {
      return 0;
    }

    return watchedMovies.reduce((scoreSum, movie) => movie.score + scoreSum, 0)/ watchedMovies.length; //AverageScore
  };

 

  getLastAdded(): Movie | undefined {
    const movies = this.loadFromStorage();
    movies.sort((a, b) => b.dateAdded.getTime() - a.dateAdded.getTime()); //getTime() converte objeto Date em número(ms)
    return movies[0]
  
  }
  
  
  getMostWatchedDirector(): string | undefined {

    const movies = this.loadFromStorage();
    const watchedMovies = movies.filter((movie) => movie.status === "watched");

    if (watchedMovies.length === 0) {
      return undefined;
    } 
    
    const directorCounter: {[key: string]: number} = {} //ex: {Tarantino: 2, Villeneuve: 5,....}
    //alternativa: const directorCounter: Record<string, number> = {}

    for (let movie of watchedMovies) {
      directorCounter[movie.director] = (directorCounter[movie.director] || 0) + 1; 

    }

    let maxDirector = "";
    let max = 0;


    for (let director in directorCounter) {
        if (directorCounter[director] > max) {
          maxDirector = director;
          max = directorCounter[director];
        }
    }

    return maxDirector;

  };
  getTotalWatchTime(): number {

    const movies = this.loadFromStorage();

    const totalMinutes = movies
      .filter(movie => movie.status === "watched")
      .reduce((sum, movie) => sum + movie.runtime, 0);

    return totalMinutes;
  };








 

  private seedData(): void {

    const movies: Movie[] = [
      {
        id: 1,
        title: "Dune",
        genre: "Sci-Fi",
        director: "Denis Villeneuve",
        score: 8,
        runtime: 155,
        releaseDate: new Date("2021-10-22"),
        dateAdded: new Date("2021-10-22"),
        status: "watched"
      },
      {
        id: 2,
        title: "Inception",
        genre: "Sci-Fi",
        director: "Christopher Nolan",
        score: 9,
        runtime: 148,
        releaseDate: new Date("2010-07-16"),
        dateAdded: new Date("2010-07-16"),
        status: "watched"
      },
      {
        id: 3,
        title: "Interstellar",
        genre: "Sci-Fi",
        director: "Christopher Nolan",
        score: 10,
        runtime: 169,
        releaseDate: new Date("2014-11-07"),
        dateAdded: new Date("2014-11-07"),
        status: "watched"
      },
      {
        id: 4,
        title: "The Matrix",
        genre: "Sci-Fi",
        director: "The Wachowskis",
        score: 9,
        runtime: 136,
        releaseDate: new Date("1999-03-31"),
        dateAdded: new Date("1999-03-31"),
        status: "watched"
      },
      {
        id: 5,
        title: "The Matrix Reloaded",
        genre: "Sci-Fi",
        director: "The Wachowskis",
        score: 7,
        runtime: 138,
        releaseDate: new Date("2003-05-15"),
        dateAdded: new Date("2003-05-15"),
        status: "watched"
      },
      {
        id: 6,
        title: "The Matrix Revolutions",
        genre: "Sci-Fi",
        director: "The Wachowskis",
        score: 6,
        runtime: 129,
        releaseDate: new Date("2003-11-05"),
        dateAdded: new Date("2003-11-05"),
        status: "watched"
      },
      {
        id: 7,
        title: "Blade Runner 2049",
        genre: "Sci-Fi",
        director: "Denis Villeneuve",
        score: 9,
        runtime: 164,
        releaseDate: new Date("2017-10-06"),
        dateAdded: new Date("2017-10-06"),
        status: "to-watch"
      },
      {
        id: 8,
        title: "Arrival",
        genre: "Sci-Fi",
        director: "Denis Villeneuve",
        score: 8,
        runtime: 116,
        releaseDate: new Date("2016-11-11"),
        dateAdded: new Date("2016-11-11"),
        status: "watched"
      },
      {
        id: 9,
        title: "The Dark Knight",
        genre: "Action",
        director: "Christopher Nolan",
        score: 10,
        runtime: 152,
        releaseDate: new Date("2008-07-18"),
        dateAdded: new Date("2008-07-18"),
        status: "watched"
      },
      {
        id: 10,
        title: "Pulp Fiction",
        genre: "Crime",
        director: "Quentin Tarantino",
        score: 10,
        runtime: 154,
        releaseDate: new Date("1994-10-14"),
        dateAdded: new Date("1994-10-14"),
        status: "watched"
      },
      {
        id: 11,
        title: "Fight Club",
        genre: "Drama",
        director: "David Fincher",
        score: 9,
        runtime: 139,
        releaseDate: new Date("1999-10-15"),
        dateAdded: new Date("1999-10-15"),
        status: "to-watch"
      },
      {
        id: 12,
        title: "The Godfather",
        genre: "Crime",
        director: "Francis Ford Coppola",
        score: 10,
        runtime: 175,
        releaseDate: new Date("1972-03-24"),
        dateAdded: new Date("1972-03-24"),
        status: "watched"
      },
      {
        id: 13,
        title: "The Godfather Part II",
        genre: "Crime",
        director: "Francis Ford Coppola",
        score: 10,
        runtime: 202,
        releaseDate: new Date("1974-12-20"),
        dateAdded: new Date("1974-12-20"),
        status: "to-watch"
      },
      {
        id: 14,
        title: "Avengers: Endgame",
        genre: "Superhero",
        director: "Anthony and Joe Russo",
        score: 8,
        runtime: 181,
        releaseDate: new Date("2019-04-26"),
        dateAdded: new Date("2019-04-26"),
        status: "watched"
      },
      {
        id: 15,
        title: "Parasite",
        genre: "Drama",
        director: "Bong Joon-ho",
        score: 10,
        runtime: 132,
        releaseDate: new Date("2019-05-30"),
        dateAdded: new Date("2019-05-30"),
        status: "to-watch"
      }
    ];
    this.saveToStorage(movies);
  };  
};
