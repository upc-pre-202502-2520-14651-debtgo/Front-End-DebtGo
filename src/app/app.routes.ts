import { Routes } from '@angular/router';

import { HomeComponent } from './modules/home/home';
import { EducationComponent } from './modules/education/education';
import { DebtComponent } from './modules/debts/debts';
import { DebtFormComponent } from './modules/debts/debt-form/debt-form';
import { PaymentHistoryComponent } from './modules/payment-history/payment-history';
import { PaymentPlanComponent } from './modules/payment-plan/payment-plan';
import { PaymentMethodComponent } from './modules/payment-method/payment-method';
import { ConsultantReviewComponent } from './modules/reviews/reviews';
import { DashboardComponent } from './modules/dashboard/dashboard';
import { EducationDetailComponent } from './modules/education/education-detail/education-detail';
import { LoginComponent } from './modules/users/login/login';
import { UserRegisterComponent } from './modules/users/user-register/user-register';
import { SimulatorComponent } from './modules/simulator/simulator';
import { authGuard } from './auth/auth.guard';

// CONSULTOR
import { ConsultantLayoutComponent } from './modules/consultants/consultants-layout/consultants-layout';
import { ConsultantDashboardComponent } from './modules/consultants/consultants-dashboard/consultants-dashboard';
import { ConsultantProfileComponent } from './modules/consultants/consultants-profile/consultants-profile';
import { ConsultantServicesComponent } from './modules/consultants/consultants-service/consultants-service';
import { ConsultantCasesComponent } from './modules/consultants/consultants-case/consultants-case';
import { ConsultantMetricsComponent } from './modules/consultants/consultants-metric/consultants-metric';
import { ConsultantComponent as ConsultantListComponent } from './modules/consultants/consultants';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: UserRegisterComponent },
  { path: 'education', component: EducationComponent },
  { path: 'education/:id', component: EducationDetailComponent },
  { path: 'debts', component: DebtComponent },
  { path: 'debt-form', component: DebtFormComponent },

  // Grupo CONSULTOR
  {
    path: 'consultant',
    component: ConsultantLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: ConsultantDashboardComponent },
      { path: 'profile', component: ConsultantProfileComponent },
      { path: 'services', component: ConsultantServicesComponent },
      { path: 'cases', component: ConsultantCasesComponent },
      { path: 'metrics', component: ConsultantMetricsComponent },
      { path: 'list', component: ConsultantListComponent }
    ]
  },

  // Resto del sistema
  { path: 'payment-history', component: PaymentHistoryComponent },
  { path: 'payment-plan', component: PaymentPlanComponent },
  { path: 'payment-method', component: PaymentMethodComponent },
  { path: 'reviews', component: ConsultantReviewComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'simulator', component: SimulatorComponent },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];