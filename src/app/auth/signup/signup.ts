import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.html',
  styleUrl: './signup.css',
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class Signup {
  username = '';
  email = '';
  password = '';
  phone = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.error = '';
    const user: User = { username: this.username, email: this.email, password: this.password, phone: this.phone };
    this.auth.signup(user).subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => this.error = 'Erreur lors de la création du compte'
    });
  }
}
