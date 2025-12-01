import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, RouterModule, RouterOutlet]
})
export class AppComponent implements OnInit {

  user: any = null;
  role: string | null = null;
  showNavbar = false;

  isMenuOpen: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {

    // Detecta cambio de ruta
    this.router.events.subscribe(() => {
      this.updateNavbarVisibility();
    });
  }

  ngOnInit(): void {
    try {
      const raw = localStorage.getItem('currentUser');

      if (raw) {
        const u = JSON.parse(raw);

        // Mantener el OBJETO this.user
        this.user = u;

        this.role = u.role ?? null;
      }

    } catch (e) {
      console.warn('Error leyendo currentUser de localStorage', e);
    }
  }

  updateNavbarVisibility() {
    const path = this.router.url;

    const hiddenRoutes = [
      '/login',
      '/register',
      '/payment-plan',
      '/payment-method'
    ];

    // Ocultar en rutas públicas
    if (hiddenRoutes.some(r => path.includes(r))) {
      this.showNavbar = false;
      return;
    }

    // Ocultar toda la zona /consultant exceptuando /consultant/home
    if (path.startsWith('/consultant/') && !path.includes('/consultant/home')) {
      this.showNavbar = false;
      return;
    }


    // Mostrar navbar solo si hay usuario
    this.showNavbar = !!this.user;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  logout(): void {
    this.auth.clearUser();
    this.closeMenu();
    this.router.navigate(['/login']);
  }
}