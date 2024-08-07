import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@netlifeacademic/services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated())
    return router.createUrlTree(['/auth/login']);

  if (authService.getInfoUser().role !== 'ADMIN')
    return router.createUrlTree(['/home']);
  else return true;
};
