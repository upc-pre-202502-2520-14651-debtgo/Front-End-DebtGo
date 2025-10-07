import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReviewService, Review } from '../../services/reviews.service';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reviews.html',
  styleUrls: ['./reviews.css']
})
export class ConsultantReviewComponent implements OnInit {
  reviews: Review[] = [];
  reviewsFiltradas: Review[] = [];
  promedio = 0;
  filtro: string = '';

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    const consultantId = Number(localStorage.getItem('consultantId') || 1);
    this.reviewService.getByConsultant(consultantId).subscribe({
      next: data => {
        this.reviews = data;
        this.reviewsFiltradas = data;
        this.promedio = this.calcularPromedio(data);
      },
      error: err => console.error('Error al cargar reseñas', err)
    });
  }

  filtrarResenas() {
    this.reviewsFiltradas = this.filtro
      ? this.reviews.filter(r => r.rating == Number(this.filtro))
      : this.reviews;
  }

  calcularPromedio(data: Review[]): number {
    return data.length
      ? data.map(r => r.rating).reduce((a, b) => a + b, 0) / data.length
      : 0;
  }

  responder(r: any) {
    r.reply = r.tempReply;
    r.tempReply = '';
    alert('Respuesta enviada ✅ (simulada, aún no guardada en backend)');
  }
}