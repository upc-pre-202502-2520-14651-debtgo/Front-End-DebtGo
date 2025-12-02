import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Metrics {
    sessions: number;
    avgRating: number;
    compliance: number;
    revenue: number;
}

@Injectable({ providedIn: 'root' })
export class MetricsService {

    private api = `${environment.apiUrl}/api/v1/metrics`;

    constructor(private http: HttpClient) { }

    private headers() {
        const token = localStorage.getItem('token') ?? '';
        return {
            headers: new HttpHeaders({
                Authorization: `Bearer ${token}`
            })
        };
    }

    getMetrics(consultantId: number): Observable<Metrics> {
        return this.http.get<Metrics>(
            `${this.api}/${consultantId}`,
            this.headers()
        );
    }
}