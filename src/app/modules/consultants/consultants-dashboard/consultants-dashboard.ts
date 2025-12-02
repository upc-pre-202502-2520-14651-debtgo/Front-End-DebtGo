import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultantService } from '../../../services/consultants.service';
import { ConsultantSummary } from '../../../modules/consultants/consultants.model';

@Component({
  selector: 'app-consultant-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consultants-dashboard.html',
  styleUrls: ['./consultants-dashboard.css']
})
export class ConsultantDashboardComponent implements OnInit {

  summary?: ConsultantSummary;
  consultantId = Number(localStorage.getItem('consultantId') || 1);

  constructor(private service: ConsultantService) { }

  ngOnInit(): void {
    this.service.getSummary(this.consultantId).subscribe({
      next: data => this.summary = data,
      error: err => console.error('Error summary', err)
    });
  }
}