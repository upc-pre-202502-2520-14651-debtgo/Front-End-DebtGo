import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DebtSummary {
  id?: number;
  clientName: string;
  totalDebt: number;
  monthlyPayment: number;
  dueDate?: string;
  status?: string;
}

@Injectable({ providedIn: 'root' })
export class DebtService {
  private baseUrl = 'http://localhost:8080/api/v1/debts';

  constructor(private http: HttpClient) {}

  obtenerResumen(): Observable<any> {
    return this.http.get(`${this.baseUrl}/summary`);
  }

  listarDeudas(): Observable<DebtSummary[]> {
    return this.http.get<DebtSummary[]>(`${this.baseUrl}/list`);
  }

  // Método para crear una deuda
  crearDeuda(debt: DebtSummary): Observable<DebtSummary> {
    return this.http.post<DebtSummary>(`${this.baseUrl}/create`, debt);
  }
}