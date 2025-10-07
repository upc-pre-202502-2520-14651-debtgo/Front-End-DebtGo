import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface PaymentHistory {
  id: number;
  concepto: string;
  monto: number;
  estado: string;
  fecha: string;
}

@Injectable({ providedIn: 'root' })
export class PaymentHistoryService {
  private apiUrl = 'http://localhost:8080/api/pagos';

  constructor(private http: HttpClient) {}

  listarPagos(): Observable<PaymentHistory[]> {
    return this.http.get<PaymentHistory[]>(this.apiUrl);
  }

  listarPlanes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/planes`);
  }
}