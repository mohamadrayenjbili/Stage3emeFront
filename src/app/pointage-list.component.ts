import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointageService, Pointage } from './pointage.service';

@Component({
  selector: 'app-pointage-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Liste des pointages</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Heure d'arrivée</th>
          <th>Heure de départ</th>
          <th>Utilisateur</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let p of pointages">
          <td>{{ p.id }}</td>
          <td>{{ p.date }}</td>
          <td>{{ p.heureArrivee }}</td>
          <td>{{ p.heureDepart }}</td>
          <td>{{ p.utilisateur }}</td>
        </tr>
      </tbody>
    </table>
  `
})
export class PointageListComponent implements OnInit {
  pointages: Pointage[] = [];

  constructor(private pointageService: PointageService) {}

  ngOnInit() {
    this.pointageService.getAll().subscribe(data => this.pointages = data);
  }
} 