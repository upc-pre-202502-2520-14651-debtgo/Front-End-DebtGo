import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

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

  showNavbar = true;

  constructor(private auth: AuthService, private router: Router) {
    router.events.subscribe(() => {
      const hiddenRoutes = ['/login', '/register'];

      this.showNavbar = !hiddenRoutes.includes(this.router.url);
    });
  }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.user = user;
      this.role = user?.role ?? null;
    });
  }

  toggleMenu() { this.isMenuOpen = !this.isMenuOpen; }

  logout() {
    this.auth.clearUser();
    this.user = null;
    this.role = null;
    this.isMenuOpen = false;
    this.showNavbar = false;

    this.router.navigate(['/login']);
  }
}