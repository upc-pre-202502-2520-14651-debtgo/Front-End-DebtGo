import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Toastify from 'toastify-js';
import { ConsultantService } from '../../../services/consultants.service';
import { ConsultantCase } from '../../../modules/consultants/consultants.model';

@Component({
  selector: 'app-consultant-cases',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consultants-case.html',
  styleUrls: ['./consultants-case.css']
})
export class ConsultantCasesComponent implements OnInit {
  cases: ConsultantCase[] = [];
  consultantId = Number(localStorage.getItem('consultantId') || 1);

  constructor(private service: ConsultantService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.service.listCases(this.consultantId).subscribe({
      next: d => this.cases = d,
      error: e => this.toast('Error al cargar casos','error')
    });
  }

  changeStatus(c: ConsultantCase, status: string) {
    this.service.updateCaseStatus(c.id, status).subscribe({
      next: () => { this.toast('Estado actualizado','success'); this.load(); },
      error: e => this.toast('Error al actualizar estado','error')
    });
  }

  private toast(msg:string, type:'success'|'error'){
    const bg = type==='success'?'linear-gradient(90deg,#16a34a,#22c55e)':'linear-gradient(90deg,#dc2626,#ef4444)';
    Toastify({ text:msg, duration:2500, gravity:'top', position:'right', close:true, style:{background:bg,color:'#fff',borderRadius:'10px'} }).showToast();
  }
}