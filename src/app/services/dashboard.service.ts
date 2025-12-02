import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface MonthStat {
  nombre: string;
  valor: number;
}

export interface ReviewResponse {
  id: number;
  rating: number;
  comment: string;
  consultantId: number;
  consultantName: string;
}

export interface ConsultantDashboard {
  promedioCalificacion: number;
  totalCasos: number;
  satisfaccion: number;
  totalResenas: number;
  meses: MonthStat[];
  ultimasResenas: ReviewResponse[];
}

@Injectable({ providedIn: 'root' })
export class DashboardService {

  private apiUrl = `${environment.apiUrl}/v1/dashboard`;

  constructor(private http: HttpClient) { }

  private headers() {
    const token = localStorage.getItem('token') ?? '';
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
  }

  getDashboard(id: number): Observable<ConsultantDashboard> {
    return this.http.get<ConsultantDashboard>(
      `${this.apiUrl}/${id}`,
      this.headers()
    );
  }
}