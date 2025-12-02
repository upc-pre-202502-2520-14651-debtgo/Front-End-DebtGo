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

  private api = `${environment.apiUrl}/consultants`;

  constructor(private http: HttpClient) { }

  listarConsultores() {
    return this.http.get<Consultant[]>(this.api);
  }

  getConsultant(id: number) {
    return this.http.get<Consultant>(`${this.api}/${id}`);
  }

  updateConsultant(id: number, dto: Consultant): Observable<Consultant> {
    return this.http.put<Consultant>(`${this.api}/${id}`, dto);
  }

  getSummary(id: number) {
    return this.http.get<ConsultantSummary>(`${this.api}/${id}/summary`);
  }

  // SERVICES
  listServices(id: number) {
    return this.http.get<ConsultantServiceItem[]>(`${this.api}/${id}/services`);
  }

  createService(item: ConsultantServiceItem): Observable<any> {
    return this.http.post(`${this.api}/services`, item);
  }

  updateService(id: number, item: ConsultantServiceItem): Observable<any> {
    return this.http.put(`${this.api}/services/${id}`, item);
  }

  deleteService(id: number): Observable<any> {
    return this.http.delete(`${this.api}/services/${id}`);
  }

  // CASES
  listCases(id: number) {
    return this.http.get<ConsultantCase[]>(`${this.api}/requests/by-consultant/${id}`);
  }

  updateCaseStatus(id: number, status: string) {
    return this.http.patch(`${this.api}/requests/${id}/status`, { status });
  }

  getMetrics(id: number) {
    return this.http.get(`${this.api}/metrics/${id}`);
  }
}