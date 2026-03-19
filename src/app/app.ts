import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
//import { environment } from '../environments/environment.development';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('projeto-final');
}


/* 
async function loadUsers() {
  const response = await fetch(environment.API_URL + '/users');
  const users = await response.json();

  console.log(users);
}

loadUsers(); */
//teste





