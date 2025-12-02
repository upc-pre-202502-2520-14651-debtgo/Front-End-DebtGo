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
export interface SimulationPreview {
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  schedule: SimulationRow[];
}

export interface SimulationSaved {
  simulationId: number;
}

@Injectable({ providedIn: 'root' })
export class SimulatorService {

  private api = `${environment.apiUrl}/simulations`;

  constructor(private http: HttpClient) { }

  preview(body: SimulationReq) {
    return this.http.post<SimulationPreview>(`${this.api}/preview`, body);
  }

  create(body: SimulationReq) {
    return this.http.post<SimulationSaved>(`${this.api}/save`, body);
  }

  listByUser(userId: number) {
    return this.http.get<any[]>(`${this.api}/history/${userId}`);
  }

  exportarPDF(dto: any) {
    return this.http.post(`${this.api}/pdf`, dto, { responseType: 'blob' });
  }
}