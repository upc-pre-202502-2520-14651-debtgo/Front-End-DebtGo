import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Case {
  id: number;
  titulo: string;
  consultor: string;
  estado: string;
}

@Injectable({ providedIn: 'root' })
export class CaseService {
  private apiUrl = 'http://localhost:8080/api/casos';

  constructor(private http: HttpClient) {}

  listarCasos(): Observable<Case[]> {
    return this.http.get<Case[]>(this.apiUrl);
  }
}