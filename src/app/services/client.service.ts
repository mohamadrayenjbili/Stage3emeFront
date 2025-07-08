import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Client {
  id: string;
  nom: string;
}

@Injectable({
  providedIn: 'root',
})
export class ClientService {
private baseUrl = 'http://localhost:8080/api/clients'; // ✅ URL complète

  constructor(private http: HttpClient) {}

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl);
  }
}
