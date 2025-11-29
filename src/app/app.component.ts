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

        // 1. OCULTAR EN LOGIN Y REGISTER
        if (url === '/login' || url === '/register') {
          this.showNavbar = false;
          return;
        }

        // 2. MOSTRAR NAVBAR SOLO EN:
        //    /home (emprendedor)
        //    /consultant/home (consultor)
        if (url === '/home' || url === '/consultant/home') {
          this.showNavbar = true;
          return;
        }

        // 3. EN CUALQUIER OTRA RUTA → OCULTAR
        this.showNavbar = false;
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