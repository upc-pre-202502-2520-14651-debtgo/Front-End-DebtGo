import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationService, Education } from '../../services/education.service';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.html',
  styleUrls: ['./education.css']
})
export class EducationComponent implements OnInit {
  education: Education[] = [];

  constructor(private educationService: EducationService) {}

  ngOnInit(): void {
    this.educationService.listarRecursos().subscribe({
      next: data => this.education = data,
      error: err => console.error('❌ Error al cargar recursos', err)
    });
  }

  abrirRecurso(link?: string): void {
    if (link) {
      window.open(link, '_blank');
    } else {
      console.warn('⚠️ No hay enlace disponible para este recurso.');
    }
  }
}