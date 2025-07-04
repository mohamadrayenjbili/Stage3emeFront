import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TimeEntry {
  id?: string;
  userId?: string;
  date: string;
  hoursWorked: number;
  description?: string;
}

export interface DaySummary {
  day: string;
  totalHours: number;
  entries: TimeEntry[];
}

export interface PeriodSummary {
  startDay: string;
  endDay: string;
  totalHours: number;
  entries: TimeEntry[];
}

export interface TotalSummary {
  totalHours: number;
  entries: TimeEntry[];
}

@Injectable({ providedIn: 'root' })
export class TimeEntryService {
  private apiUrl = '/api/time-entry';

  constructor(private http: HttpClient) {}

  getDay(date: string): Observable<DaySummary> {
    return this.http.get<DaySummary>(`${this.apiUrl}/day/${date}`, { withCredentials: true });
  }

  getWeek(startDay: string, endDay: string): Observable<PeriodSummary> {
    return this.http.get<PeriodSummary>(`${this.apiUrl}/week/${startDay}/${endDay}`, { withCredentials: true });
  }

  getMonth(yearMonth: string): Observable<PeriodSummary> {
    return this.http.get<PeriodSummary>(`${this.apiUrl}/month/${yearMonth}`, { withCredentials: true });
  }

  getTotal(): Observable<TotalSummary> {
    return this.http.get<TotalSummary>(`${this.apiUrl}/total`, { withCredentials: true });
  }

  addTimeEntry(entry: TimeEntry): Observable<TimeEntry> {
    return this.http.post<TimeEntry>(this.apiUrl, entry, { withCredentials: true });
  }
} 