import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface CaseItem {
  id: number;
  clientName: string;
  requestedAt: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED';
}

@Injectable({ providedIn: 'root' })
export class CaseService {

  private api = `${environment.apiUrl}/consultants/requests`;

  constructor(private http: HttpClient) { }

  private headers() {
    const token = localStorage.getItem('token') ?? '';
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  /** Listar casos de un consultor */
  listarCasos(consultantId: number) {
    return this.http.get(
      `${this.api}/by-consultant/${consultantId}`
    );
  }

  changeStatus(caseId: number, status: string) {
    return this.http.patch(
      `${this.api}/${caseId}/status`,
      { status }
    );
  }
}