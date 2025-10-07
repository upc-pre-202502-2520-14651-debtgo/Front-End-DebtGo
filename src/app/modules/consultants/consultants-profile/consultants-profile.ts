import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Toastify from 'toastify-js';
import { Consultant } from '../consultants.model';
import { ConsultantService } from '../../../services/consultants.service';

@Component({
  selector: 'app-consultant-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consultants-profile.html',
  styleUrls: ['./consultants-profile.css']
})
export class ConsultantProfileComponent implements OnInit {
  consultant?: Consultant;
  consultantId = Number(localStorage.getItem('consultantId') || 1);

  constructor(private service: ConsultantService) {}

  ngOnInit(): void {
    this.service.getConsultant(this.consultantId).subscribe({
      next: d => this.consultant = d,
      error: e => this.toast('Error al cargar perfil','error')
    });
  }

  guardar() {
    if (!this.consultant) return;
    this.service.updateConsultant(this.consultantId, this.consultant).subscribe({
      next: d => { this.consultant = d; this.toast('Perfil actualizado','success'); },
      error: e => this.toast('Error al actualizar','error')
    });
  }

  private toast(msg:string, type:'success'|'error') {
    const bg = type==='success'?'linear-gradient(90deg,#16a34a,#22c55e)':'linear-gradient(90deg,#dc2626,#ef4444)';
    Toastify({ text: msg, duration: 2500, gravity:'top', position:'right', close:true, style:{ background:bg, color:'#fff', borderRadius:'10px'} }).showToast();
  }
}