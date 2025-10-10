import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private baseUrl = `${environment.apiUrl}/api/v1/payments`;

  constructor(private http: HttpClient) {}

  listByConsultant(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/by-consultant/${id}`);
  }
}