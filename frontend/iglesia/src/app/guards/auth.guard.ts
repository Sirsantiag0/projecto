import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.user();
  if (!user) {
    return router.createUrlTree(['/login']);
  }

  const allowedRoles = route.data?.['roles'] as number[] | undefined;
  if (!allowedRoles || allowedRoles.length === 0) {
    return true;
  }

  const userRole = user.id_rol;
  if (userRole != null && allowedRoles.includes(userRole)) {
    return true;
  }

  return router.createUrlTree(['/home']);
};