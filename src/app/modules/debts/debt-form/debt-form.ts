import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DebtService, DebtSummary } from '../../../services/debt.service';
import Toastify from 'toastify-js';

@Component({
  selector: 'app-debt-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './debt-form.html',
  styleUrls: ['./debt-form.css']
})
export class DebtFormComponent {
  @Output() deudaCreada = new EventEmitter<void>();

  nuevaDeuda: DebtSummary = {
    clientName: '',
    totalDebt: 0,
    monthlyPayment: 0,
    dueDate: '',
    status: 'ACTIVE'
  };

  constructor(private debtService: DebtService) {}

    registrarDeuda() {
    this.debtService.crearDeuda(this.nuevaDeuda).subscribe({
        next: () => {
        this.mostrarToast('Deuda registrada con éxito', 'success');
        this.nuevaDeuda = { clientName: '', totalDebt: 0, monthlyPayment: 0, dueDate: '', status: 'ACTIVE' };
        this.deudaCreada.emit();
        },
        error: (err) => {
        console.error('❌ Error al registrar la deuda', err);
        this.mostrarToast('Error al registrar la deuda', 'error');
        }
    });
    }

    private mostrarToast(mensaje: string, tipo: 'success' | 'error') {
    const isSuccess = tipo === 'success';

    const icon = isSuccess ? '✅' : '❌';
    const bgGradient = isSuccess
        ? 'linear-gradient(90deg, #16a34a, #22c55e)'
        : 'linear-gradient(90deg, #dc2626, #ef4444)';

    Toastify({
        text: `${icon} ${mensaje}`,
        duration: 3500,
        gravity: 'top',
        position: 'right',
        close: true,
        stopOnFocus: true,
        style: {
        background: bgGradient,
        color: '#fff',
        fontWeight: '600',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
        padding: '10px 16px',
        animation: 'fadeInUp 0.4s ease'
        },
        offset: { x: 20, y: 80 }
    }).showToast();
    }
}