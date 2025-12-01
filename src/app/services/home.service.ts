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

  private base = `${environment.apiUrl}/home`;

  constructor(private http: HttpClient) { }

  getSummary(): Observable<HomeSummary> {
    return this.http.get<HomeSummary>(`${this.base}/summary`);
  }

  getNotifications(limit: number): Observable<HomeNotification[]> {
    return this.http.get<HomeNotification[]>(`${this.base}/notifications?limit=${limit}`);
  }

  getMovements(limit: number): Observable<HomeMovement[]> {
    return this.http.get<HomeMovement[]>(`${this.base}/movements?limit=${limit}`);
  }

  getEducationHighlights(limit: number): Observable<EducationHighlight[]> {
    return this.http.get<EducationHighlight[]>(`${this.base}/education?limit=${limit}`);
  }
}