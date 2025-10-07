import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const user = localStorage.getItem('currentUser');

  if (user) {
    return true; // Usuario autenticado
  }

  // Si no hay usuario → redirigir a login
  router.navigate(['/login']);
  return false;
};
