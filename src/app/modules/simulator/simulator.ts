import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SimulatorService, SimulationReq } from '../../services/simulator.service';

type Row = {
  n: number;
  date: string;
  payment: number;
  interest: number;
  principal: number;
  balance: number;
};

@Component({
  selector: 'app-simulator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './simulator.html',
  styleUrls: ['./simulator.css']
})
export class SimulatorComponent {

  constructor(private api: SimulatorService) {}

  // Estado
  modo: 'nuevo' | 'historial' = 'nuevo';
  historial: any[] = [];

  // Formulario
  monto = 10000;
  tasa = 20;
  plazo = 12;
  extra = 0;
  fechaInicio = this.toInputDate(new Date());

  // Resultados
  cuotas = signal<Row[]>([]);
  cuotaMensual = signal(0);
  interesTotal = signal(0);
  pagoTotal = signal(0);

  get valido(): boolean {
    return this.monto > 0 && this.tasa >= 0 && this.plazo > 0;
  }

  ngOnInit() {
    this.cargarHistorial();
  }

  simular(): void {
    if (!this.valido) { this.reset(); return; }

    const body: SimulationReq = {
      amount: this.monto,
      annualRate: this.tasa,
      months: this.plazo,
      extra: this.extra || 0,
      startDate: this.fechaInicio
    };

    this.api.preview(body).subscribe({
      next: (r) => {
        this.cuotaMensual.set(r.monthlyPayment);
        this.interesTotal.set(r.totalInterest);
        this.pagoTotal.set(r.totalPayment);
        this.cuotas.set(r.schedule);
      },
      error: () => this.reset()
    });
  }

  guardar(): void {
    if (!this.valido) return;

    const body: SimulationReq = {
      amount: this.monto,
      annualRate: this.tasa,
      months: this.plazo,
      extra: this.extra,
      startDate: this.fechaInicio,
      userId: Number(localStorage.getItem('userId') || 1)
    };

    this.api.create(body).subscribe({
      next: (r) => {
        alert(`✅ Simulación guardada (ID: ${r.simulationId})`);
        this.cargarHistorial();
      },
      error: () => alert('Error al guardar simulación')
    });
  }

  cargarHistorial() {
    const userId = Number(localStorage.getItem('userId') || 1);
    this.api.listByUser(userId).subscribe({
      next: (res) => this.historial = res || [],
      error: () => (this.historial = [])
    });
  }

  usar(h: any) {
    this.modo = 'nuevo';
    this.monto = h.amount;
    this.tasa = h.annualRate;
    this.plazo = h.months;
    this.extra = h.extra;
    this.fechaInicio = this.toInputDate(new Date(h.startDate));
    this.simular();
  }

  reset(): void {
    this.cuotas.set([]);
    this.cuotaMensual.set(0);
    this.interesTotal.set(0);
    this.pagoTotal.set(0);
  }

  exportCSV(): void {
    const rows = this.cuotas();
    if (!rows.length) return;

    const header = ['#','Fecha','Cuota','Interés','Capital','Saldo'];
    const body = rows.map(r => [
      r.n, r.date, r.payment.toFixed(2),
      r.interest.toFixed(2), r.principal.toFixed(2), r.balance.toFixed(2)
    ]);

    const csv = [header, ...body].map(a => a.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'simulacion_debtgo.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  private toInputDate(d: Date): string {
    const m = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${d.getFullYear()}-${m}-${day}`;
  }

  // Método para exportar PDF
  exportarPDF(): void {
    const dto = {
      monthlyPayment: this.cuotaMensual(),
      totalInterest: this.interesTotal(),
      totalPayment: this.pagoTotal(),
      schedule: this.cuotas(),
      userName: localStorage.getItem('userName') || 'Usuario DebtGo'
    };

    this.api.exportarPDF(dto).subscribe({
      next: (pdfBlob) => {
        const blob = new Blob([pdfBlob], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'reporte_simulacion_debtgo.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => console.error('❌ Error al descargar PDF', err)
    });
  }
}