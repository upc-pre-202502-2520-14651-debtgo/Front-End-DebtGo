import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showNavbar = false;
  initialized = false;

  private hiddenRoutes = ['/login', '/register', '/payment-plan', '/payment-method'];

  constructor(private router: Router) {
    console.log('🧠 Environment actual:', environment);
      this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      this.updateNavbarVisibility(event.url);
    });


  }

    ngOnInit() {
    this.updateNavbarVisibility(this.router.url);
    this.initialized = true;
  }

  private updateNavbarVisibility(url: string) {
  const hiddenRoutes = ['/login', '/register', '/payment-plan', '/payment-method'];

  // Si estoy en login/register/etc → ocultar navbar SIEMPRE
  if (hiddenRoutes.some(route => url.startsWith(route))) {
    this.showNavbar = false;
    return;
  }

  // Para el resto de rutas → mostrar sólo si hay usuario logueado
  this.showNavbar = !!localStorage.getItem('currentUser');
}

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }
}