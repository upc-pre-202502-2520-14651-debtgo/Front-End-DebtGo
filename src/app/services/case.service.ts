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

  private api = `${environment.apiUrl}/api/v1/case-requests`;

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
  listarCasos(consultantId: number): Observable<CaseItem[]> {
    return this.http.get<CaseItem[]>(
      `${this.api}/requests/by-consultant/${consultantId}`,
      this.headers()
    );
  }

  /** Cambiar estado */
  changeStatus(
    caseId: number,
    status: CaseItem['status']
  ): Observable<any> {
    return this.http.put(
      `${this.api}/requests/${caseId}/status`,
      { status },
      this.headers()
    );
  }
}