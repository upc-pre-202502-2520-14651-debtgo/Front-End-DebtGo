import { Component, OnInit, inject } from '@angular/core';
import { MetricsService, Metrics } from '../../../services/metrics.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-consultant-metrics',
  imports: [CommonModule],
  templateUrl: '../../consultants/consultants-metric/consultants-metric.html',
  styleUrls: ['../../consultants/consultants-metric/consultants-metric.css']
})
export class ConsultantMetricsComponent implements OnInit {

  private metricsSrv = inject(MetricsService);

  metrics: Metrics | null = null;

  ngOnInit(): void {
    const u = JSON.parse(localStorage.getItem('currentUser')!);

    this.metricsSrv.getMetrics(u.id).subscribe({
      next: data => this.metrics = data,
      error: err => console.error('Error cargando métricas', err)
    });
  }
}
