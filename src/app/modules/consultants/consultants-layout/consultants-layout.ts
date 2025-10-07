import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-consultant-layout',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './consultants-layout.html',
  styleUrls: ['./consultants-layout.css']
})
export class ConsultantLayoutComponent {}