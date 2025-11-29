import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { User, RegisterRequest } from '../user.model';

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
  private apiUrl = `${environment.apiUrl}/api/users`; // Backend

  constructor(private http: HttpClient) { }

  registerUser(user: RegisterRequest) {
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