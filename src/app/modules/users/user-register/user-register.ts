import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';
import {
  HomeService,
  HomeSummary,
  HomeNotification,
  HomeMovement,
  EducationHighlight
} from '../../../services/home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: '../../home/home.html',
  styleUrls: ['../../home/home.css']
})
export class UserRegisterComponent implements OnInit {
  private homeSrv = inject(HomeService);
  private router = inject(Router);

  consultantStats = {
    activeCases: 12,
    clients: 45,
    rating: '4.8 ⭐'
  };

  // Estado UI
  loading = true;
  errorMsg = '';

  // Datos
  user: string = '';
  summary!: HomeSummary;
  notifications: HomeNotification[] = [];
  movements: HomeMovement[] = [];
  highlights: EducationHighlight[] = [];

  role: string | null = null;

  ngOnInit(): void {
    try {
      const raw = localStorage.getItem('currentUser');
      if (raw) {
        const u = JSON.parse(raw);

        this.user = u.email.split('@')[0];
        this.role = u.role;
      }
    } catch (e) {
      console.warn('Error leyendo currentUser de localStorage', e);
    }

    this.loadData();
  }

  private loadData(): void {
    this.loading = true;
    this.errorMsg = '';

    forkJoin({
      summary: this.homeSrv.getSummary(),
      notifications: this.homeSrv.getNotifications(5),
      movements: this.homeSrv.getMovements(6),
      highlights: this.homeSrv.getEducationHighlights(3),
    }).subscribe({
      next: ({ summary, notifications, movements, highlights }) => {
        console.log('✅ Summary recibido:', summary);
        console.log('✅ Notificaciones recibidas:', notifications);
        console.log('✅ Movimientos recibidos:', movements);
        console.log('✅ Educación recibida:', highlights);

        this.summary = summary;
        this.notifications = notifications;
        this.movements = movements;
        this.highlights = highlights;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error al cargar datos del Home:', err);
        this.errorMsg = 'No pudimos cargar tu panel. Inténtalo nuevamente.';
        this.loading = false;
      }
    });
  }

  // Helpers UI
  trackById = (_: number, item: { id: number }) => item.id;
  trackByIndex = (_: number, __: unknown) => _;

  go(path: string) {
    this.router.navigate([path]);
  }
}