import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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

  private api = `${environment.apiUrl}/v1/education`;

  constructor(private http: HttpClient) { }

  listarRecursos(): Observable<Education[]> {
    return this.http.get<Education[]>(`${this.api}/highlights`);
  }

  obtenerPorId(id: number): Observable<Education> {
    return this.http.get<Education>(`${this.api}/${id}`);
  }

  getVideos() {
    return this.http.get(`${this.api}/videos`);
  }

  getResources() {
    return this.http.get(`${this.api}/resources`);
  }

  getHighlights() {
    return this.http.get(`${this.api}/highlights`);
  }
}