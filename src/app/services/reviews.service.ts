import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Review {
  id: number;
  rating: number;
  comment: string;
  entrepreneurId: number;
  consultantId: number;
  consultantName: string;
  entrepreneurName: string;
  reply?: string; 
  tempReply?: string;
}

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private apiUrl = `${environment.apiUrl}/api/reviews`;

  constructor(private http: HttpClient) {}

  listarEvaluaciones(): Observable<Review[]> {
    return this.http.get<Review[]>(this.apiUrl);
  }

  crearEvaluacion(review: Partial<Review>, entrepreneurId: number, consultantId: number): Observable<Review> {
    return this.http.post<Review>(
      `${this.apiUrl}?entrepreneurId=${entrepreneurId}&consultantId=${consultantId}`,
      review
    );
  }

    getByConsultant(consultantId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/consultant/${consultantId}`);
  }
}