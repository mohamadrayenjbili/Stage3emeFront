import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimeEntryService, TotalSummary, TimeEntryInput, TimeEntry } from '../services/time-entry.service';
import { ClientService, Client } from '../services/client.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class Dashboard implements OnInit {
  totalSummary?: TotalSummary;
  filteredEntries: TimeEntry[] = [];
  error = '';

  day = '';
  startTime = '';
  endTime = '';
  filterDate = '';

  clients: Client[] = [];
  selectedClientId = '';

  constructor(
    private timeEntryService: TimeEntryService,
    private clientService: ClientService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadTotalSummary();
    this.loadClients();
  }

  loadClients() {
    this.clientService.getClients().subscribe({
      next: (data) => {
        this.clients = data;
      },
      error: () => {
        this.error = "Erreur lors du chargement des clients.";
      }
    });
  }

  loadTotalSummary() {
    this.timeEntryService.getTotal().subscribe({
      next: (data) => {
        this.totalSummary = data;
        this.filteredEntries = data.entries;
      },
      error: () => {
        this.error = 'Erreur lors du chargement des pointages.';
      },
    });
  }

  onSubmit() {
    this.error = '';

    if (this.startTime >= this.endTime) {
      this.error = "L'heure de fin doit être après l'heure de début.";
      return;
    }

    if (!this.selectedClientId) {
      this.error = "Veuillez sélectionner un client.";
      return;
    }

    const entry: TimeEntryInput = {
      day: this.day,
      startTime: this.startTime,
      endTime: this.endTime,
      clientId: this.selectedClientId
    };

    this.timeEntryService.addTimeEntry(entry).subscribe({
      next: () => {
        this.day = '';
        this.startTime = '';
        this.endTime = '';
        this.selectedClientId = '';
        this.loadTotalSummary();
      },
      error: (err) => {
        console.error("Erreur lors de l'ajout :", err);
        this.error = "Erreur lors de l'ajout du pointage.";
      },
    });
  }

  formatHours(hours: number): string {
    const h = Math.floor(hours);
    const minutes = Math.round((hours - h) * 60);
    return `${h}h ${minutes}min`;
  }

  applyDateFilter() {
    if (!this.filterDate || !this.totalSummary) return;
    this.filteredEntries = this.totalSummary.entries.filter(
      (entry) => entry.day === this.filterDate
    );
  }

  resetFilter() {
    this.filterDate = '';
    if (this.totalSummary) {
      this.filteredEntries = this.totalSummary.entries;
    }
  }

  getClientName(clientId: string): string {
    const client = this.clients.find(c => c.id === clientId);
    return client ? client.nom : 'Client inconnu';
  }

logout() {
  // Appeler la route logout du backend via un service ou fetch direct
  fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
    .then(response => {
      if (response.ok) {
        // Rediriger vers la page login
        this.router.navigate(['/login']);
      } else {
        this.error = 'Erreur lors de la déconnexion.';
      }
    })
    .catch(() => {
      this.error = 'Erreur lors de la déconnexion.';
    });
}
}
