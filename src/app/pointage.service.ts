import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pointage {
  id: number;
  date: string;
  heureArrivee: string;
  heureDepart: string;
  utilisateur: string;
}

@Injectable({ providedIn: 'root' })
export class PointageService {
  private apiUrl = '/api/pointages';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Pointage[]> {
    return this.http.get<Pointage[]>(this.apiUrl);
  }

  add(pointage: Pointage): Observable<Pointage> {
    return this.http.post<Pointage>(this.apiUrl, pointage);
  }

  // Ajoute d'autres méthodes si besoin (update, delete...)
} 