import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EducationService, Education } from '../../../services/education.service';
import { SafeUrlPipe } from './safeUrl.pipe';

@Component({
  selector: 'app-education-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, SafeUrlPipe],
  templateUrl: './education-detail.html',
  styleUrls: ['./education-detail.css']
})
export class EducationDetailComponent implements OnInit {
  recurso?: Education;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private educationService: EducationService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.errorMessage = 'ID de recurso no válido.';
      this.isLoading = false;
      return;
    }

    this.educationService.obtenerPorId(id).subscribe({
      next: data => {
        this.recurso = data;
        this.isLoading = false;
      },
      error: err => {
        console.error('❌ Error al obtener el recurso:', err);
        this.errorMessage = 'Error al cargar el recurso. Intenta nuevamente.';
        this.isLoading = false;
      }
    });
  }

  getCategoryIcon(category: string): string {
    switch (category) {
      case 'Deudas': return 'https://cdn-icons-png.flaticon.com/512/2331/2331970.png';
      case 'Ahorro': return 'https://cdn-icons-png.flaticon.com/512/1086/1086741.png';
      case 'Crédito': return 'https://cdn-icons-png.flaticon.com/512/3135/3135706.png';
      case 'Inversiones': return 'https://cdn-icons-png.flaticon.com/512/2331/2331933.png';
      default: return 'https://cdn-icons-png.flaticon.com/512/2721/2721165.png';
    }
  }
}