import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DebtService, DebtSummary } from '../../services/debt.service';
import { DebtFormComponent } from './debt-form/debt-form';

@Component({
  selector: 'app-debt',
  standalone: true,
  imports: [CommonModule, DebtFormComponent],
  templateUrl: './debts.html',
  styleUrls: ['./debts.css']
})
export class DebtComponent implements OnInit {
  resumen: any = {};
  deudas: DebtSummary[] = [];
  cargando = true;
  mostrarFormulario = false;

  constructor(private debtService: DebtService) {}

  ngOnInit(): void {
    this.cargarResumen();
    this.cargarDeudas();
  }

  cargarResumen() {
    this.debtService.obtenerResumen().subscribe({
      next: data => this.resumen = data,
      error: err => console.error('❌ Error al cargar resumen', err)
    });
  }

  cargarDeudas() {
    this.debtService.listarDeudas().subscribe({
      next: data => {
        this.deudas = data;
        this.cargando = false;
      },
      error: err => {
        console.error('❌ Error al cargar deudas', err);
        this.cargando = false;
      }
    });
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  onDeudaCreada() {
    this.cargarDeudas();
    this.mostrarFormulario = false; 
  }

  obtenerColorEstado(status?: string): string {
    switch (status) {
      case 'ACTIVE': return 'badge-active';
      case 'PAID': return 'badge-paid';
      case 'LATE': return 'badge-late';
      default: return 'badge-default';
    }
  }
}