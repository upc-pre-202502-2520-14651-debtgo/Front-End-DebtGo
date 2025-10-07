import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { User } from '../user.model';

export interface LoginResponse {
 success: boolean;
  message: string;
  user: User | null;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  user: User | null;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users'; // Backend

  constructor(private http: HttpClient) {}

  registerUser(user: User): Observable<RegisterResponse> {
  return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, user, {
  headers: { 'Content-Type': 'application/json' }
});
}

loginUser(credentials: { email: string; password: string }): Observable<LoginResponse> {
  return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials);
}

getUsers(): Observable<User[]> {
  return this.http.get<User[]>(this.apiUrl);
}

  // --- Logout ---
  logout(): void {
    localStorage.removeItem('currentUser');
  }
}