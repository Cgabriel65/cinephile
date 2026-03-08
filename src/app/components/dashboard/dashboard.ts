import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../models/movie.model';
import { MovieCard } from '../movie-card/movie-card';
import { MinutesToHoursPipe } from '../../pipes/minutes-to-hours-pipe';

@Component({
  selector: 'app-dashboard',
  imports: [MovieCard, MinutesToHoursPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {  //interface OnInit para assegurar que metodo ngOnInit é implementado
  totalMovies: number = 0;
  watchedCount: number = 0;
  avgScore: number = 0;
  lastAdded?: Movie //pode dar undefined ou Movie, tmb podia fazer lastAdded: Movie | undefined = undefined;
  mostWatchedDirector?: string;
  totalWatchTime: number = 0;

  constructor(private movieService: MovieService) {} //como MovieService é um injectable n preciso de fazer new MovieService(angular faz automaticamente uma unica fez para todos os componentes)
  

  ngOnInit(): void {  //OnInit assegura que os KPI são carregados apenas após o componente ser criado, inicializado, dependencias injetadas...(o que nao acontecer se simplesmente chamassemos loadKPI() diretamente no construtor)
    this.loadKPIs();
  };

  loadKPIs(): void {
    this.totalMovies = this.movieService.getTotalMovies();
    this.watchedCount = this.movieService.getWatchedCount();
    this.avgScore = Number(this.movieService.getAverageScore().toFixed(1));
    this.lastAdded = this.movieService.getLastAdded();
    this.mostWatchedDirector = this.movieService.getMostWatchedDirector() || '';
    this.totalWatchTime = this.movieService.getTotalWatchTime();
  };



}
