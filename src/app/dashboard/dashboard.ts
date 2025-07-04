import { Component, OnInit } from '@angular/core';
import { TimeEntryService, TotalSummary } from '../services/time-entry.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  standalone: true,
  imports: [CommonModule]
})
export class Dashboard implements OnInit {
  totalSummary?: TotalSummary;
  error = '';

  constructor(private timeEntryService: TimeEntryService) {}

  ngOnInit() {
    this.timeEntryService.getTotal().subscribe({
      next: (data) => this.totalSummary = data,
      error: (err) => this.error = 'Erreur lors du chargement des pointages.'
    });
  }
}
