import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConsultantService } from '../../services/consultants.service';
import { Consultant } from './consultants.model';

@Component({
  selector: 'app-consultants',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consultants.html',
  styleUrls: ['./consultants.css']
})
export class ConsultantComponent implements OnInit {

  consultants: Consultant[] = [];
  consultoresFiltrados: Consultant[] = [];
  filtro: string = '';

  constructor(private consultantService: ConsultantService) { }

  ngOnInit(): void {
    this.consultantService.getAllConsultants().subscribe({
      next: (data) => {
        this.consultants = data;
        this.consultoresFiltrados = data;
      },
      error: (err) => console.error('Error cargando consultores:', err)
    });
  }

  filtrarConsultores(): void {
    const filtroLower = this.filtro.toLowerCase();

    this.consultoresFiltrados = this.consultants.filter(c =>
      c.fullName.toLowerCase().includes(filtroLower) ||
      c.specialty.toLowerCase().includes(filtroLower)
    );
  }
}