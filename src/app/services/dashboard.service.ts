import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://localhost:8080/api/consultants/dashboard';

  constructor(private http: HttpClient) {}

  getDashboard(consultantId: number): Observable<ConsultantDashboard> {
    return this.http.get<ConsultantDashboard>(`${this.apiUrl}/${consultantId}`);
  }
}