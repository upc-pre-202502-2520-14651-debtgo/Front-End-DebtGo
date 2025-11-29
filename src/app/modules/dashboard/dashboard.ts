import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService, ConsultantDashboard } from '../../services/dashboard.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, BaseChartDirective],
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  data?: ConsultantDashboard;
  isLoading = true;
  errorMessage = '';
  consultantId = 1;

  motivationalMessage = '';
  animationIcon = ''; // según rendimiento

  kpiColors = {
    promedio: '#ffffff',
    satisfaccion: '#ffffff'
  };

  // Configuración del gráfico de barras
  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1200, easing: 'easeOutQuart' },
    scales: {
      x: {},
      y: { beginAtZero: true, ticks: { stepSize: 1 } }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#6a1b9a',
        titleColor: '#fff',
        bodyColor: '#fff'
      }
    }
  };

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Casos por mes',
        backgroundColor: '#8e24aa',
        hoverBackgroundColor: '#ab47bc',
        borderRadius: 8,
        barThickness: 28
      }
    ]
  };

  // Configuración del gráfico circular
  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { animateRotate: true, animateScale: true, duration: 1300, easing: 'easeOutBack' },
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#333', font: { size: 13 } }
      },
      tooltip: {
        backgroundColor: '#6a1b9a',
        titleColor: '#fff',
        bodyColor: '#fff'
      }
    }
  };

  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['⭐ 1', '⭐ 2', '⭐ 3', '⭐ 4', '⭐ 5'],
    datasets: [
      {
        data: [0, 0, 0, 0, 0],
        backgroundColor: ['#ef5350', '#ffb74d', '#ffee58', '#81c784', '#42a5f5'],
        borderColor: '#fff',
        borderWidth: 2,
        hoverOffset: 8
      }
    ]
  };

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    const user = localStorage.getItem('currentUser');
    if (user) this.consultantId = JSON.parse(user).id;
    this.loadDashboard();
  }

  loadDashboard() {
    this.dashboardService.getDashboard(this.consultantId).subscribe({
      next: (res) => {
        this.data = res;
        this.isLoading = false;

        this.updateBarChart(res.meses);
        this.updatePieChart(res.ultimasResenas);
        this.updateKpiColors(res);
        this.setMotivationalMessage(res);
      },
      error: (err) => {
        console.error('Error al cargar Dashboard', err);
        this.errorMessage = 'No se pudieron obtener los datos del Dashboard.';
        this.isLoading = false;
      }
    });
  }

  updateBarChart(meses: any[]) {
    this.barChartData.labels = meses.map(m => m.nombre);
    this.barChartData.datasets[0].data = meses.map(m => m.valor);
  }

  updatePieChart(resenas: any[]) {
    const conteo = [0, 0, 0, 0, 0];
    resenas.forEach(r => {
      if (r.rating >= 1 && r.rating <= 5) conteo[r.rating - 1]++;
    });
    this.pieChartData.datasets[0].data = conteo;
  }

  updateKpiColors(data: ConsultantDashboard) {
    this.kpiColors.promedio =
      data.promedioCalificacion >= 4 ? '#C8E6C9' : data.promedioCalificacion >= 3 ? '#FFF9C4' : '#FFCDD2';
    this.kpiColors.satisfaccion =
      data.satisfaccion >= 80 ? '#C8E6C9' : data.satisfaccion >= 60 ? '#FFF9C4' : '#FFCDD2';
  }

  // Mensaje y animación
  setMotivationalMessage(data: ConsultantDashboard) {
    if (data.promedioCalificacion >= 4.5 && data.satisfaccion >= 90) {
      this.motivationalMessage = '🌟 ¡Excelente trabajo! Estás superando las expectativas.';
      this.animationIcon = '🌟';
    } else if (data.promedioCalificacion >= 4 && data.satisfaccion >= 75) {
      this.motivationalMessage = '💪 Buen rendimiento, tus clientes confían en ti.';
      this.animationIcon = '🔥';
    } else if (data.promedioCalificacion >= 3) {
      this.motivationalMessage = '🙂 Vas bien, sigue esforzándote para subir al siguiente nivel.';
      this.animationIcon = '🚀';
    } else {
      this.motivationalMessage = '🚀 No te desanimes, cada reto te acerca a ser mejor.';
      this.animationIcon = '💡';
    }
  }
}