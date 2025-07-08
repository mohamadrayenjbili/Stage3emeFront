import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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
  type: string = '';
  
  // Champs user
  username = '';
  phone = '';

  // Champs client
  nom = '';
  adresse = '';
  nomSociete = '';
  numTel = '';

  // Champs communs
  email = '';
  password = '';
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.error = '';

    if (!this.type) {
      this.error = 'Veuillez choisir un type de compte.';
      return;
    }

    const payload: any = {
      type: this.type,
      email: this.email,
      password: this.password,
    };

    if (this.type === 'user') {
      payload.username = this.username;
      payload.phone = this.phone;
    } else if (this.type === 'client') {
      payload.nom = this.nom;
      payload.adresse = this.adresse;
      payload.nomSociete = this.nomSociete;
      payload.numTel = this.numTel;
    }

    this.http.post<any>('http://localhost:8080/api/auth/signup', payload).subscribe({
      next: (res) => {
        if (res && this.type === 'user') {
          this.router.navigate(['/dashboard-user']);
        } else if (res && this.type === 'client') {
          this.router.navigate(['/dashboard-client']);
        }
      },
      error: (err) => {
        this.error = err.error || 'Erreur lors de la création du compte';
      }
    });
  }

  goToSignin() {
    this.router.navigate(['/signin']);
  }
}
