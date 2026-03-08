import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../models/movie.model';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-movie-form',
  imports: [ReactiveFormsModule],
  templateUrl: './movie-form.html',
  styleUrl: './movie-form.css',
})

export class MovieForm implements OnInit {

  form = new FormGroup({
    movieTitle: new FormControl ("", [Validators.required]),  //new FormControl(valorInicial, [validadores])  
    movieGenre: new FormControl ("", [Validators.required]),   //Validators.required:  verifica se campo é null,undefined ou ""
    movieDirector: new FormControl ("", [Validators.required]),
    movieScore: new FormControl<number | null>(null, [Validators.min(0), Validators.max(10)]),
    movieRuntime: new FormControl<number | null>(null, [Validators.min(0)]),
    movieRelease: new FormControl<Date | null>(null),
    movieStatus: new FormControl("to-watch", [Validators.required])
    
  });

  editingId?: number
  editMode = false;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.editingId = Number(id);
      this.editMode = true;
      const movie = this.movieService.getMovieById(this.editingId);

      if (movie) {
        this.form.patchValue({
          movieTitle: movie.title,
          movieGenre: movie.genre,
          movieDirector: movie.director,
          movieScore: movie.score,
          movieRuntime: movie.runtime,
          movieRelease: movie.releaseDate,
          movieStatus: movie.status
        });
      }        
    }
    
  }

  onSubmit(): void {
    if (this.form.invalid) {    //Verifica se todos os campos cumprem os Validators
      alert("Fill all required fields");
      return;
    }

    const movie: Movie = {
      id: this.editingId ?? Date.now(),
      title: this.form.get("movieTitle")?.value || "",
      genre: this.form.get("movieGenre")?.value || "",
      director: this.form.get("movieDirector")?.value || "",
      score: Number(this.form.get("movieScore")?.value?.toFixed(1)) || 0,
      runtime: this.form.get("movieRuntime")?.value || 0,
      releaseDate: new Date(this.form.get("movieRelease")?.value ?? new Date()),
      dateAdded: new Date(),
      status: this.form.get("movieStatus")?.value as "watched" | "to-watch" //assegurar ao TS que o input será um destes dois valores

    };

    
    if (this.editingId) {
      this.movieService.updateMovie(movie);
      
    } else {
      this.movieService.addMovie(movie);
    } 

    this.form.reset({ movieStatus: "to-watch" });
    this.router.navigate(['/movies']);


  }

}
