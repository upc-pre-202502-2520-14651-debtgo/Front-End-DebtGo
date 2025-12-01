import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CaseService {
  private api = `${environment.apiUrl}/api/v1/consultants`;

  constructor(private http: HttpClient) { }

  private headers() {
    const token = localStorage.getItem('token') ?? '';
    return {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    };
  }

  listarCasos(consultantId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.api}/requests/by-consultant/${consultantId}`,
      this.headers()
    );
  }
}