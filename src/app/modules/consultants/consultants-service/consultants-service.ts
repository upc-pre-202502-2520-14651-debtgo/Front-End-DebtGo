import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Toastify from 'toastify-js';
import { ConsultantServiceItem } from '../../../modules/consultants/consultants.model';
import { ConsultantService } from '../../../services/consultants.service';

@Component({
  selector: 'app-consultant-services',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consultants-service.html',
  styleUrls: ['./consultants-service.css']
})
export class ConsultantServicesComponent implements OnInit {
  consultantId = Number(localStorage.getItem('consultantId') || 1);
  items: ConsultantServiceItem[] = [];
  nuevo: ConsultantServiceItem = { title:'', description:'', price:0, consultantId: this.consultantId };

  constructor(private service: ConsultantService) {}

  ngOnInit(): void { this.load(); }

  load() {
    this.service.listServices(this.consultantId).subscribe({
      next: d => this.items = d,
      error: e => this.toast('Error al cargar servicios','error')
    });
  }

  crear() {
    this.service.createService(this.nuevo).subscribe({
      next: d => { this.toast('Servicio creado','success'); this.nuevo = { title:'', description:'', price:0, consultantId: this.consultantId }; this.load(); },
      error: e => this.toast('Error al crear','error')
    });
  }

  guardar(item: ConsultantServiceItem) {
    if (!item.id) return;
    this.service.updateService(item.id, item).subscribe({
      next: d => this.toast('Servicio actualizado','success'),
      error: e => this.toast('Error al actualizar','error')
    });
  }

  eliminar(id?: number) {
    if (!id) return;
    this.service.deleteService(id).subscribe({
      next: () => { this.toast('Servicio eliminado','success'); this.load(); },
      error: e => this.toast('Error al eliminar','error')
    });
  }

  private toast(msg:string, type:'success'|'error'){ 
    const bg = type==='success'?'linear-gradient(90deg,#16a34a,#22c55e)':'linear-gradient(90deg,#dc2626,#ef4444)';
    Toastify({ text:msg, duration:2500, gravity:'top', position:'right', close:true, style:{background:bg, color:'#fff', borderRadius:'10px'} }).showToast();
  }
}