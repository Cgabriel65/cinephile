import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Supabase } from '../../services/supabase';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  private router = inject(Router);
  private supabase = inject(Supabase);

  isLogin = true;

  user = {
    name: '',
    email: '',
    password: ''
  };

  toggleMode() {
    this.isLogin = !this.isLogin;
  }

  async submit() {
    if (this.isLogin) {
      const loggedUser = await this.supabase.login(
        this.user.email,
        this.user.password
      );

      if (!loggedUser) {
        alert('Invalid credentials');
        return;
      }

      
      console.log('User logged in:', loggedUser);
      alert('Login successful! Check console for user data.');
      this.router.navigate(['/dashboard']);

    } else {
      const newUser = await this.supabase.createUser(
        this.user.email,
        this.user.password,
        this.user.name
      );

      if (!newUser) {
        alert('User already exists');
        return;
      }

      console.log('User registered:', newUser);
      alert('User created! Check Supabase to see it.');
      this.isLogin = true;
    }
  }
}