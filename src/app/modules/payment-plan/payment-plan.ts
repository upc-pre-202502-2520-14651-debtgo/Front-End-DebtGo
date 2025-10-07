import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-plan',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment-plan.html',
  styleUrls: ['./payment-plan.css']
})
export class PaymentPlanComponent {
  selectedPlan: string = '';
  cardName = '';
  cardNumber = '';
  expiry = '';
  cvv = '';
  message = '';

  constructor(private router: Router) {}

  choosePlan(plan: string) {
    this.selectedPlan = plan;
  }

  goBack() {
    this.selectedPlan = ''; 
    this.message = ''; 
    this.cardName = '';
    this.cardNumber = '';
    this.expiry = '';
    this.cvv = '';
  }

  processPayment() {
    if (!this.cardName || !this.cardNumber || !this.expiry || !this.cvv) {
      this.message = '⚠️ Por favor completa todos los campos de pago';
      return;
    }

    const success = Math.random() > 0.2; // 80% éxito
    if (success) {
      localStorage.setItem('plan', this.selectedPlan);
      this.message = '✅ Pago exitoso, ¡bienvenido!';
      setTimeout(() => this.router.navigate(['/home']), 1500);
    } else {
      this.message = '❌ Error en la transacción, intenta nuevamente';
    }
  }
}