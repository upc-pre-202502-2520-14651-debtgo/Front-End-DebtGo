import { Component, OnInit, inject } from '@angular/core';
import { CaseService, CaseItem } from '../../../services/case.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-consultant-cases',
  imports: [CommonModule],
  templateUrl: '../../consultants/consultants-case/consultants-case.html',
  styleUrls: ['../../consultants/consultants-case/consultants-case.css']
})
export class ConsultantCasesComponent implements OnInit {

  private caseSrv = inject(CaseService);

  cases: CaseItem[] = [];
  loading = true;

  ngOnInit(): void {
    const u = JSON.parse(localStorage.getItem('currentUser')!);

    this.caseSrv.listarCasos(u.id).subscribe({
      next: res => {
        this.cases = res;
        this.loading = false;
      },
      error: err => {
        console.error('Error cargando casos', err);
        this.loading = false;
      }
    });
  }

  changeStatus(c: CaseItem, status: CaseItem['status']) {
    this.caseSrv.changeStatus(c.id, status).subscribe({
      next: () => {
        c.status = status;
      },
      error: err => console.error('Error cambiando estado:', err)
    });
  }
}