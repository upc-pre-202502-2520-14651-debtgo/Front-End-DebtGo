import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoginResponse, RegisterRequest, User } from '../modules/users/user-models/user.model'; // ← IMPORTAR ESTO

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl = `${environment.apiUrl}/v1/users`;

    private userSubject = new BehaviorSubject<User | null>(null);
    user$ = this.userSubject.asObservable();

    constructor(private http: HttpClient) {
        const saved = localStorage.getItem('currentUser');
        if (saved) {
            this.userSubject.next(JSON.parse(saved));
        }
    }

    loginUser(credentials: { email: string; password: string }): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials);
    }

    registerUser(data: RegisterRequest): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, data);
    }

    // Guardar usuario en memoria + localStorage
    setUser(user: User) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.userSubject.next(user);
    }

    clearUser() {
        localStorage.removeItem('currentUser');
        this.userSubject.next(null);
    }

    getUserRole(): string | null {
        return this.userSubject.value?.role ?? null;
    }

    isLogged(): boolean {
        return !!this.userSubject.value;
    }

    getCurrentUser(): User | null {
        const raw = localStorage.getItem('currentUser');
        if (!raw) return null;

        try {
            return JSON.parse(raw);
        } catch (e) {
            console.warn("Error parsing user", e);
            return null;
        }
    }
}