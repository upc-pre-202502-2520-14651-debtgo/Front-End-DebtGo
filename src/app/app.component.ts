import { Component } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user: any = null;
  role: string | null = null;
  isMenuOpen = false;

  // Navbar global visible únicamente donde corresponde
  showNavbar = false;

  constructor(private auth: AuthService, private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {

        const url = event.urlAfterRedirects;

        // OCULTAR SOLO EN LOGIN Y REGISTER
        if (url.startsWith('/login') || url.startsWith('/register')) {
          this.showNavbar = false;
        } else {
          // MOSTRAR EN TODAS LAS DEMÁS RUTAS
          this.showNavbar = true;
        }
      });
  }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.user = user;
      this.role = user?.role ?? null;
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.auth.clearUser();
    this.user = null;
    this.role = null;
    this.isMenuOpen = false;
    this.showNavbar = false;
    this.router.navigate(['/login']);
  }
}