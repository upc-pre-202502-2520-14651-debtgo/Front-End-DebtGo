import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PaymentService {

  private api = `${environment.apiUrl}/payments`;

  constructor(private http: HttpClient) { }

  listByUser(id: number) {
    return this.http.get(`${this.api}/${id}`);
  }

  listByConsultant(id: number) {
    return this.http.get(`${this.api}/by-consultant/${id}`);
  }
}