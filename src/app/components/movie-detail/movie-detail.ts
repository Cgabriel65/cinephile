import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../models/movie.model';
import { DatePipe } from '@angular/common';
import { MinutesToHoursPipe } from '../../pipes/minutes-to-hours-pipe';

@Component({
  selector: 'app-movie-detail',
  imports: [RouterLink, DatePipe, MinutesToHoursPipe],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.css',
})
export class MovieDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private movieService = inject(MovieService);

  movie?: Movie;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.movie = this.movieService.getMovieById(id);
  }
}
