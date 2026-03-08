import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../models/movie.model';
import { CommonModule } from '@angular/common';
import { MovieCard } from '../movie-card/movie-card';


@Component({
  selector: 'app-movie-list',
  imports: [CommonModule, MovieCard],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
})
export class MovieList implements OnInit {

  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  filter: "all" | "watched" | "to-watch" = "all";
  search: string = '';
  sortOption: 'dateAddedDesc' | 'dateAddedAsc' = 'dateAddedDesc';

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  };

  loadMovies(): void {
    this.movies = this.movieService.getAllMovies();
    this.filterMovies();
  };

  deleteMovie (id: number): void {
    this.movieService.deleteMovie(id);
    this.loadMovies();
    
  };  

  filterMovies(): void {
     const searchMovie = this.search.toLowerCase();

    if (searchMovie) {
      this.filteredMovies = this.movies.filter(movie => movie.title.toLowerCase().includes(searchMovie));
    return;
    }



    if (this.filter === "all") {
      this.filteredMovies = [...this.movies];
    } else {
      this.filteredMovies = this.movies.filter(movie => movie.status === this.filter);
      
    }; 
    this.applySorting(); 

  }; 

  setFilter(filter: "all" | "watched" | "to-watch"): void {
    this.filter = filter;
    this.filterMovies();

  };

  onSortChange(option: string): void {
    if (option === 'dateAddedDesc' || option === 'dateAddedAsc') {
      this.sortOption = option;
      this.applySorting();
    }
  }


  applySorting(): void {
    if (!this.filteredMovies) return;

    if (this.sortOption === 'dateAddedDesc') {
      this.filteredMovies.sort((a, b) => b.dateAdded.getTime() - a.dateAdded.getTime());
    } else {
      this.filteredMovies.sort((a, b) => a.dateAdded.getTime() - b.dateAdded.getTime());
    }
  }


  

};
