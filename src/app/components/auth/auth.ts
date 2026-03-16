import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  constructor(private router: Router) {}
  isLogin = true;

  user = {
    name: '',
    email: '',
    password: ''
  };

  toggleMode() {
    this.isLogin = !this.isLogin;
  }

  submit() {

    if (this.isLogin) {
      console.log("Login", this.user);
      this.router.navigate(['/dashboard']);
      // chamar API login
    } else {
      console.log("Register", this.user);
      // chamar API registo
    }

  }
}
