import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id?: string;
  username: string;
  email?: string;
  password?: string;
  phone?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = '/api/auth';

  constructor(private http: HttpClient) {}

login(username: string, password: string): Observable<User> {
  return this.http.post<User>(`${this.apiUrl}/login`, { username, password }, { withCredentials: true });
}

signup(user: User): Observable<User> {
  return this.http.post<User>(`${this.apiUrl}/signup`, user, { withCredentials: true });
}

logout(): Observable<any> {
  return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true });
}

getCurrentUser(): Observable<User> {
  return this.http.get<User>(`${this.apiUrl}/me`, { withCredentials: true });
}
} 