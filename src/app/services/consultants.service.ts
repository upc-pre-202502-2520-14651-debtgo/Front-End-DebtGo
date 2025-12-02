import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  Consultant,
  ConsultantServiceItem,
  ConsultantSummary,
  ConsultantCase
} from '../modules/consultants/consultants.model';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ConsultantService {

  private api = `${environment.apiUrl}/v1/consultants`;

  constructor(private http: HttpClient) { }

  // 🚀 SIN TOKEN → CONSULTA FUNCIONA
  listarConsultores(): Observable<Consultant[]> {
    return this.http.get<Consultant[]>(`${this.api}`);
  }

  getConsultant(id: number): Observable<Consultant> {
    return this.http.get<Consultant>(`${this.api}/${id}`);
  }

  updateConsultant(id: number, dto: Consultant): Observable<Consultant> {
    return this.http.put<Consultant>(`${this.api}/${id}`, dto);
  }

  getSummary(consultantId: number): Observable<ConsultantSummary> {
    return this.http.get<ConsultantSummary>(`${this.api}/${consultantId}/summary`);
  }

  // ==========================
  // SERVICES
  // ==========================
  listServices(consultantId: number): Observable<ConsultantServiceItem[]> {
    return this.http.get<ConsultantServiceItem[]>(`${this.api}/${consultantId}/services`);
  }

  createService(item: ConsultantServiceItem) {
    return this.http.post(`${this.api}/services`, item);
  }

  updateService(id: number, item: ConsultantServiceItem) {
    return this.http.put(`${this.api}/services/${id}`, item);
  }

  deleteService(id: number) {
    return this.http.delete(`${this.api}/services/${id}`);
  }

  // ==========================
  // CASES
  // ==========================
  listCases(consultantId: number): Observable<ConsultantCase[]> {
    return this.http.get<ConsultantCase[]>(`${this.api}/requests/by-consultant/${consultantId}`);
  }

  updateCaseStatus(id: number, status: string): Observable<void> {
    return this.http.patch<void>(`${this.api}/requests/${id}/status`, { status });
  }

  // ==========================
  // METRICS
  // ==========================
  getMetrics(consultantId: number): Observable<any> {
    return this.http.get<any>(`${this.api}/metrics/${consultantId}`);
  }
}