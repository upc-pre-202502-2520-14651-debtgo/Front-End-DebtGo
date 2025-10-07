import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultantService } from '../../../services/consultants.service';

@Component({
  selector: 'app-consultant-metrics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consultants-metric.html',
  styleUrls: ['./consultants-metric.css']
})
export class ConsultantMetricsComponent implements OnInit {
  metrics: any;
  consultantId = Number(localStorage.getItem('consultantId') || 1);

  constructor(private service: ConsultantService) {}

  ngOnInit(): void {
    this.service.getMetrics(this.consultantId).subscribe({
      next: d => this.metrics = d,
      error: e => console.error('Error metrics', e)
    });
  }
}