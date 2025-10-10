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
  private baseUrl = `${environment.apiUrl}/api/v1`;

  constructor(private http: HttpClient) {}

  listarConsultores(): Observable<Consultant[]> {
    return this.http.get<Consultant[]>(`${this.baseUrl}/consultants`);
  }

  // Dashboard
  getSummary(consultantId: number): Observable<ConsultantSummary> {
    return this.http.get<ConsultantSummary>(`${this.baseUrl}/consultants/${consultantId}/summary`);
  }

  // Perfil
  getConsultant(id: number): Observable<Consultant> {
    return this.http.get<Consultant>(`${this.baseUrl}/consultants/${id}`);
  }

  updateConsultant(id: number, dto: Consultant): Observable<Consultant> {
    return this.http.put<Consultant>(`${this.baseUrl}/consultants/${id}`, dto);
  }

  // Servicios
  listServices(consultantId: number): Observable<ConsultantServiceItem[]> {
    return this.http.get<ConsultantServiceItem[]>(`${this.baseUrl}/services/by-consultant/${consultantId}`);
  }

  createService(item: ConsultantServiceItem): Observable<ConsultantServiceItem> {
    return this.http.post<ConsultantServiceItem>(`${this.baseUrl}/services`, item);
  }

  updateService(id: number, item: ConsultantServiceItem): Observable<ConsultantServiceItem> {
    return this.http.put<ConsultantServiceItem>(`${this.baseUrl}/services/${id}`, item);
  }

  deleteService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/services/${id}`);
  }

  // Asesorías (casos)
  listCases(consultantId: number): Observable<ConsultantCase[]> {
    return this.http.get<ConsultantCase[]>(`${this.baseUrl}/requests/by-consultant/${consultantId}`);
  }

  updateCaseStatus(id: number, status: string): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/requests/${id}/status`, { status });
  }

  // Métricas
  getMetrics(consultantId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/consultants/metrics/${consultantId}`);
  }
}