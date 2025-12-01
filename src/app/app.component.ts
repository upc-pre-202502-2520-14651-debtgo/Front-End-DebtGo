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

  user: { email: string; role: 'ENTREPRENEUR' | 'CONSULTANT' } | null = null;
  role: 'ENTREPRENEUR' | 'CONSULTANT' | null = null;

  showNavbar = false;
  isMenuOpen = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    this.router.events.subscribe(() => this.updateNavbarVisibility());
  }

  ngOnInit(): void {

    try {
      const raw = localStorage.getItem('currentUser');

      if (raw) {
        const u = JSON.parse(raw);

        this.user = u;
        this.role = u.role ?? null;
      }

    } catch (e) {
      console.warn('Error leyendo currentUser de localStorage', e);
    }

    this.updateNavbarVisibility();
  }

  updateNavbarVisibility() {
    const path = this.router.url;

    const hiddenRoutes = [
      '/login',
      '/register',
      '/payment-plan',
      '/payment-method'
    ];

    // No navbar en rutas ocultas
    if (hiddenRoutes.some(r => path.includes(r))) {
      this.showNavbar = false;
      return;
    }

    // Mostrar navbar si hay usuario (independiente del rol)
    if (this.user) {
      this.showNavbar = true;
      return;
    }

    this.showNavbar = false;
  }


  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.user = null;
    this.role = null;
    this.router.navigate(['/login']);
  }
}