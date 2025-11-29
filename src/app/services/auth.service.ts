import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private userSubject = new BehaviorSubject<any>(null);
    user$ = this.userSubject.asObservable();

    constructor() {
        const saved = localStorage.getItem('currentUser');
        if (saved) {
            this.userSubject.next(JSON.parse(saved));
        }
    }

    setUser(user: any) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.userSubject.next(user);
    }

    clearUser() {
        localStorage.removeItem('currentUser');
        this.userSubject.next(null);
    }

    getUserRole(): string | null {
        const user = this.userSubject.value;
        return user?.role ?? null;
    }

    isLogged(): boolean {
        return !!this.userSubject.value;
    }
}