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
  type: string;
  message: string;
  date: string;
  read: boolean;
}

export interface HomeMovement {
  date: string;
  concept: string;
  amount: number;
  status: string;
}

export interface EducationHighlight {
  id: number;
  category: string;
  title: string;
  level: string;
  pdfLink: string;
  videoLink: string;
}

/** ====== SERVICIO ====== */
@Injectable({ providedIn: 'root' })
export class HomeService {

  private api = `${environment.apiUrl.replace('/v1', '')}/home`;

  constructor(private http: HttpClient) { }

  getSummary() {
    return this.http.get<HomeSummary>(`${this.api}/home/summary`);
  }

  getNotifications(limit: number) {
    return this.http.get<HomeNotification[]>(`${this.api}/home/notifications?limit=${limit}`);
  }

  getMovements(limit: number) {
    return this.http.get<HomeMovement[]>(`${this.api}/home/movements?limit=${limit}`);
  }

  getEducationHighlights(limit: number) {
    return this.http.get<EducationHighlight[]>(`/api/v1/education/highlights`);
  }
}