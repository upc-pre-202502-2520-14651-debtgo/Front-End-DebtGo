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

  private api = `${environment.apiUrl}/education`;

  constructor(private http: HttpClient) { }

  listarRecursos(): Observable<Education[]> {
    return this.http.get<Education[]>(`${this.api}/highlights`);
  }

  obtenerPorId(id: number): Observable<Education> {
    return this.http.get<Education>(`${this.api}/${id}`);
  }

  getVideos(): Observable<Education[]> {
    return this.http.get<Education[]>(`${this.api}/videos`);
  }

  getResources(): Observable<Education[]> {
    return this.http.get<Education[]>(`${this.api}/resources`);
  }

  getHighlights(): Observable<Education[]> {
    return this.http.get<Education[]>(`${this.api}/highlights`);
  }
}
