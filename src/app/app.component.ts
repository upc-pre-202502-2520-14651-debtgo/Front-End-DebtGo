import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { User } from './modules/users/user-models/user.model';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, RouterModule, RouterOutlet]
})
export class AppComponent implements OnInit {

  user: User | null = null;
  role: 'ENTREPRENEUR' | 'CONSULTANT' | null = null;

  showNavbar = false;
  isMenuOpen = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    // Detectar cambios de ruta
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loadUserFromStorage();
        this.updateNavbarVisibility();
      }
    });
  }

  ngOnInit(): void {
    this.loadUserFromStorage();
    this.updateNavbarVisibility();
  }

  /** Cargar usuario desde localStorage */
  private loadUserFromStorage(): void {
    const raw = localStorage.getItem('currentUser');

    if (raw) {
      const parsed: User = JSON.parse(raw);
      this.user = parsed ?? null;
      this.role = parsed?.role ?? null;
    } else {
      this.user = null;
      this.role = null;
    }
  }

  /** Mostrar u ocultar navbar */
  updateNavbarVisibility(): void {
    const path = this.router.url;

    const hiddenRoutes = ['/login', '/register', '/payment-plan', '/payment-method'];

    if (hiddenRoutes.some(r => path.startsWith(r))) {
      this.showNavbar = false;
      return;
    }

    this.showNavbar = this.user !== null;
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
    this.showNavbar = false;
    this.router.navigate(['/login']);
  }
}