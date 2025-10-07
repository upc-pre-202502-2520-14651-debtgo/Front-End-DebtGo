import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-method',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment-method.html',
  styleUrls: ['./payment-method.css']
})
export class PaymentMethodComponent {
  method: string = '';
  account: string = '';
  bankName: string = '';
  message: string = '';

  constructor(private router: Router) {}

  saveMethod() {
    if (!this.method || !this.account || (this.method === 'BANK' && !this.bankName)) {
      this.message = '⚠️ Completa todos los campos';
      return;
    }

    localStorage.setItem('paymentMethod', JSON.stringify({
      method: this.method,
      account: this.account,
      bankName: this.bankName
    }));

    this.message = '✅ Método de pago guardado exitosamente';
    setTimeout(() => this.router.navigate(['/home']), 1500);
  }
}