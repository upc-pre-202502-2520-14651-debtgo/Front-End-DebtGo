import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultantService } from '../../services/consultants.service';
import { Consultant } from './consultants.model';
import { FormsModule } from '@angular/forms';
import { fromSubscribable } from 'rxjs/internal/observable/fromSubscribable';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-consultants',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consultants.html',
  styleUrls: ['./consultants.css']
})
export class ConsultantComponent implements OnInit {
  consultants: Consultant[] = [];
  filtro = '';
  consultoresFiltrados: Consultant[] = [];

  constructor(private consultantService: ConsultantService, private http: HttpClient) {}

  baseUrl = 'http://localhost:8080/api/v1';

    ngOnInit(): void {
    this.consultantService.listarConsultores().subscribe({
      next: (data: Consultant[]) => {
        this.consultants = data;
        this.consultoresFiltrados = data;
      },
      error: (err: any) => console.error('Error al cargar consultores', err)
    });
  }

  filtrarConsultores() {
    const filtroLower = this.filtro.toLowerCase();
    this.consultoresFiltrados = this.consultants.filter(c =>
      c.fullName.toLowerCase().includes(filtroLower) ||
      c.specialty.toLowerCase().includes(filtroLower)
    );
  }

    createConsultant(c: Consultant): Observable<Consultant> {
    return this.http.post<Consultant>(`${this.baseUrl}/consultants`, c);
  }
}