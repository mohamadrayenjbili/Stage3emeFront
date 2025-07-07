import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimeEntryService, TotalSummary, TimeEntryInput, TimeEntry } from '../services/time-entry.service';

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

  constructor(private timeEntryService: TimeEntryService) {}

  ngOnInit() {
    this.loadTotalSummary();
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

    const entry: TimeEntryInput = {
      day: this.day,
      startTime: this.startTime,
      endTime: this.endTime,
    };

    this.timeEntryService.addTimeEntry(entry).subscribe({
      next: () => {
        this.day = '';
        this.startTime = '';
        this.endTime = '';
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
}
