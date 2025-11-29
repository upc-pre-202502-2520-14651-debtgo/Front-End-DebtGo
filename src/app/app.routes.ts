import { Routes } from '@angular/router';

// Usuario (Emprendedor)
import { HomeComponent } from './modules/home/home';
import { EducationComponent } from './modules/education/education';
import { EducationDetailComponent } from './modules/education/education-detail/education-detail';
import { DebtComponent } from './modules/debts/debts';
import { DebtFormComponent } from './modules/debts/debt-form/debt-form';

import { PaymentHistoryComponent } from './modules/payment-history/payment-history';
import { PaymentPlanComponent } from './modules/payment-plan/payment-plan';
import { PaymentMethodComponent } from './modules/payment-method/payment-method';

import { ConsultantReviewComponent } from './modules/reviews/reviews';
import { SimulatorComponent } from './modules/simulator/simulator';

// Auth
import { LoginComponent } from './modules/users/login/login';
import { UserRegisterComponent } from './modules/users/user-register/user-register';
import { authGuard } from './core/auth-guard';

// Consultor
import { ConsultantLayoutComponent } from './modules/consultants/consultants-layout/consultants-layout';
import { ConsultantDashboardComponent } from './modules/consultants/consultants-dashboard/consultants-dashboard';
import { ConsultantProfileComponent } from './modules/consultants/consultants-profile/consultants-profile';
import { ConsultantServicesComponent } from './modules/consultants/consultants-service/consultants-service';
import { ConsultantCasesComponent } from './modules/consultants/consultants-case/consultants-case';
import { ConsultantMetricsComponent } from './modules/consultants/consultants-metric/consultants-metric';
import { ConsultantComponent as ConsultantListComponent } from './modules/consultants/consultants';

export const routes: Routes = [

  // ------------------------------
  // RUTAS PARA EMPRENDEDOR
  // ------------------------------
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'education', component: EducationComponent, canActivate: [authGuard] },
  { path: 'education/:id', component: EducationDetailComponent, canActivate: [authGuard] },

  { path: 'debts', component: DebtComponent, canActivate: [authGuard] },
  { path: 'debt-form', component: DebtFormComponent, canActivate: [authGuard] },

  { path: 'consultants', component: ConsultantListComponent, canActivate: [authGuard] },
  { path: 'payment-history', component: PaymentHistoryComponent, canActivate: [authGuard] },

  { path: 'payment-plan', component: PaymentPlanComponent, canActivate: [authGuard] },
  { path: 'payment-method', component: PaymentMethodComponent, canActivate: [authGuard] },

  { path: 'simulator', component: SimulatorComponent, canActivate: [authGuard] },
  { path: 'reviews', component: ConsultantReviewComponent, canActivate: [authGuard] },

  // ------------------------------
  // RUTAS DEL CONSULTOR
  // ------------------------------
  {
    path: 'consultant',
    component: ConsultantLayoutComponent,
    canActivate: [authGuard],
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

  // ------------------------------
  // AUTH
  // ------------------------------
  { path: 'login', component: LoginComponent },
  { path: 'register', component: UserRegisterComponent },

  // ------------------------------
  // REDIRECCIONES
  // ------------------------------
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];