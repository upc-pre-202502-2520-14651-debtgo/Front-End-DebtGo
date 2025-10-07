import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Toastify from 'toastify-js';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment-history.html',
  styleUrls: ['./payment-history.css']
})
export class PaymentHistoryComponent implements OnInit {
  pagos: any[] = [];
  pagosFiltrados: any[] = [];
  filtroMes = '';
  filtroEstado = '';
  resumen = { total: 0, pendientes: 0 };

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    const consultantId = Number(localStorage.getItem('consultantId') || 1);
    this.paymentService.listByConsultant(consultantId).subscribe({
      next: data => {
        this.pagos = data;
        this.filtrarPagos();
        this.actualizarResumen();
        this.toast('Pagos cargados correctamente', 'success');
      },
      error: err => {
        console.error('Error al cargar pagos', err);
        this.toast('Error al cargar pagos', 'error');
      }
    });
  }

  filtrarPagos() {
    this.pagosFiltrados = this.pagos.filter(p => {
      const coincideEstado = this.filtroEstado ? p.status === this.filtroEstado : true;
      const coincideMes = this.filtroMes ? p.paymentDate.startsWith(this.filtroMes) : true;
      return coincideEstado && coincideMes;
    });

    this.toast(
      this.pagosFiltrados.length
        ? `Mostrando ${this.pagosFiltrados.length} resultados`
        : 'Sin resultados para el filtro aplicado',
      this.pagosFiltrados.length ? 'success' : 'error'
    );
  }

  actualizarResumen() {
    this.resumen.total = this.pagos
      .filter(p => p.status === 'Pagado')
      .reduce((acc, p) => acc + p.amount, 0);

    this.resumen.pendientes = this.pagos
      .filter(p => p.status === 'Pendiente')
      .reduce((acc, p) => acc + p.amount, 0);
  }

  descargarComprobante(pago: any) {
    const blob = new Blob([`Comprobante de pago #${pago.id}\nServicio: ${pago.serviceName}\nMonto: S/ ${pago.amount}\nFecha: ${pago.paymentDate}`], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `Comprobante_${pago.id}.txt`;
    link.click();

    this.toast(`Comprobante de pago #${pago.id} descargado`, 'success');
  }

  private toast(msg: string, type: 'success' | 'error') {
    const bg =
      type === 'success'
        ? 'linear-gradient(90deg, #16a34a, #22c55e)'
        : 'linear-gradient(90deg, #dc2626, #ef4444)';

    Toastify({
      text: msg,
      duration: 2500,
      gravity: 'top',
      position: 'right',
      close: true,
      style: {
        background: bg,
        color: '#fff',
        borderRadius: '10px',
        fontWeight: '500',
        boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
      }
    }).showToast();
  }
}