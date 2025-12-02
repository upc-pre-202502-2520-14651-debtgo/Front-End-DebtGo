import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

/** ====== MODELOS ====== */
export interface HomeSummary {
  debtsActive: number;
  totalPending: number;
  upcomingPayments: number;
  alerts: number;
}

export interface HomeNotification {
  id: number;
  type: 'PAYMENT' | 'ALERT' | 'INFO';
  message: string;
  date: string;
  read?: boolean;
}

export interface HomeMovement {
  date: string;
  concept: string;
  amount: number;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
}

export interface EducationHighlight {
  id: number;
  title: string;
  category: string;
  level: 'BÁSICO' | 'INTERMEDIO' | 'AVANZADO';
  link: string;
}

/** ====== SERVICIO ====== */
@Injectable({ providedIn: 'root' })
export class HomeService {

  private api = `${environment.apiUrl}/api/v1/home`;

  constructor(private http: HttpClient) { }

  getSummary() {
    return this.http.get<HomeSummary>(`${this.api}/summary`);
  }

  getNotifications(limit: number) {
    return this.http.get<HomeNotification[]>(`${this.api}/notifications?limit=${limit}`);
  }

  getMovements(limit: number) {
    return this.http.get<HomeMovement[]>(`${this.api}/movements?limit=${limit}`);
  }

  getEducationHighlights(limit: number) {
    return this.http.get<EducationHighlight[]>(`${this.api}/education?limit=${limit}`);
  }
}