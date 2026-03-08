import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movie} from '../../models/movie.model';
import { MinutesToHoursPipe } from '../../pipes/minutes-to-hours-pipe';


@Component({
  selector: 'app-movie-card',
  imports: [RouterLink, CommonModule, MinutesToHoursPipe],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
})
export class MovieCard {
  
  @Input() movie!: Movie;

  @Input() showFull: boolean = false;

  @Output() delete = new EventEmitter<number>();

  onDelete() {
    this.delete.emit(this.movie.id);
  }

}


