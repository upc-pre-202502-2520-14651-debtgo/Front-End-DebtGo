import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

export interface Case {
  id: number;
  titulo: string;
  consultor: string;
  estado: string;
}

@Injectable({ providedIn: 'root' })
export class CaseService {
  private apiUrl = `${environment.apiUrl}/api/reviews`;

  constructor(private http: HttpClient) {}

  listarCasos(): Observable<Case[]> {
    return this.http.get<Case[]>(this.apiUrl);
  }
}