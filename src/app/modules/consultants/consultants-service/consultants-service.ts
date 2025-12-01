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

  items: ConsultantServiceItem[] = [];
  consultantId: number = 0;

  nuevo: ConsultantServiceItem = {
    title: '',
    description: '',
    price: 0,
    consultantId: 0
  };

  constructor(private service: ConsultantService) { }

  ngOnInit(): void {
    this.consultantId = this.getConsultantId();
    this.nuevo.consultantId = this.consultantId;
    this.load();
  }

  private getConsultantId(): number {
    const raw = localStorage.getItem('currentUser');
    if (!raw) return 0;

    const u = JSON.parse(raw);
    return Number(u.consultantId ?? 0);
  }


  load() {
    this.service.listServices(this.consultantId).subscribe({
      next: d => this.items = d,
      error: () => this.toast('Error al cargar servicios', 'error')
    });
  }

  crear() {
    this.service.createService(this.nuevo).subscribe({
      next: () => {
        this.toast('Servicio creado', 'success');
        this.nuevo = {
          title: '',
          description: '',
          price: 0,
          consultantId: this.consultantId
        };
        this.load();
      },
      error: () => this.toast('Error al crear', 'error')
    });
  }

  guardar(item: ConsultantServiceItem) {
    if (!item.id) return;
    this.service.updateService(item.id, item).subscribe({
      next: () => this.toast('Servicio actualizado', 'success'),
      error: () => this.toast('Error al actualizar', 'error')
    });
  }

  eliminar(id?: number) {
    if (!id) return;
    this.service.deleteService(id).subscribe({
      next: () => {
        this.toast('Servicio eliminado', 'success');
        this.load();
      },
      error: () => this.toast('Error al eliminar', 'error')
    });
  }

  private toast(msg: string, type: 'success' | 'error') {
    const bg = type === 'success'
      ? 'linear-gradient(90deg,#16a34a,#22c55e)'
      : 'linear-gradient(90deg,#dc2626,#ef4444)';

    Toastify({
      text: msg,
      duration: 2500,
      gravity: 'top',
      position: 'right',
      close: true,
      style: { background: bg, color: '#fff', borderRadius: '10px' }
    }).showToast();
  }
}