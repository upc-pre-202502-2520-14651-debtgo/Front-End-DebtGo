import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Education {
  id: number;
  category: string;
  title: string;
  level: string;
  pdfLink?: string;
  videoLink?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  private api = 'http://localhost:8081/api/v1/education';

  constructor(private http: HttpClient) { }

  listarRecursos(): Observable<Education[]> {
    return this.http.get<Education[]>(`${this.api}/highlights`);
  }

  obtenerPorId(id: number): Observable<Education> {
    return this.http.get<Education>(`${this.api}/${id}`);
  }
}