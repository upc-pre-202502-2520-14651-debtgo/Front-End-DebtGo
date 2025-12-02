import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface SimulationReq {
  amount: number;
  annualRate: number;
  months: number;
  extra: number;
  startDate: string; // yyyy-MM-dd
  userId?: number;
}
export interface SimulationRow {
  n: number; date: string; payment: number; interest: number; principal: number; balance: number;
}
export interface SimulationRes {
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  schedule: SimulationRow[];
  simulationId?: number;
}

@Injectable({ providedIn: 'root' })
export class SimulatorService {

  private baseUrl = `${environment.apiUrl}/v1/simulations`;

  constructor(private http: HttpClient) { }

  preview(body: SimulationReq): Observable<SimulationRes> {
    return this.http.post<SimulationRes>(`${this.baseUrl}/preview`, body);
  }

  create(body: SimulationReq): Observable<SimulationRes> {
    return this.http.post<SimulationRes>(this.baseUrl, body);
  }

  listByUser(userId: number) {
    return this.http.get<any[]>(`${this.baseUrl}/by-user/${userId}`);
  }

  exportarPDF(body: any): Observable<Blob> {
    return this.http.post(
      `${environment.apiUrl}/v1/pdf/simulation`,
      body,
      { responseType: 'blob' }
    );
  }
}