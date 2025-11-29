import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-consultant-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './consultants-layout.html',
  styleUrls: ['./consultants-layout.css']
})
export class ConsultantLayoutComponent {

  showSidebar = true;

  constructor(private router: Router) {

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.showSidebar = event.url !== '/consultant/home';
      });
  }

  goToConsultantHome() {
    this.router.navigate(['/consultant/home']);
  }
}