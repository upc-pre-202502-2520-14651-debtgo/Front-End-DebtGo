import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
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
    this.router.events.subscribe(() => this.updateNavbarVisibility());
  }

  ngOnInit(): void {
    const u = this.auth.getCurrentUser();
    this.user = u;
    this.role = u?.role ?? null;

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

    if (hiddenRoutes.some(r => path.includes(r))) {
      this.showNavbar = false;
      return;
    }

    this.showNavbar = !!this.user;
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