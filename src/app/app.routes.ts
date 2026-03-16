import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { MovieList } from './components/movie-list/movie-list';
import { MovieForm } from './components/movie-form/movie-form';
import { MovieDetail } from './components/movie-detail/movie-detail';

export const routes: Routes = [
    { path: '', component: Dashboard },
    { path: 'movies', component: MovieList}, 
    { path: 'movie-form', component: MovieForm},
    { path: 'movie/:id', component: MovieDetail},
    { path: 'movie-form/:id', component: MovieForm },
    
];

