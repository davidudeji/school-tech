import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/user.model';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const auth      = inject(AuthService);
  const router    = inject(Router);
  const required  = route.data['role'] as UserRole;
  const userRole  = auth.currentRole();

  if (!auth.isAuthenticated()) {
    return router.createUrlTree(['/login']);
  }

  if (userRole === required) {
    return true;
  }

  // Redirect to their own dashboard instead of denying access
  return router.createUrlTree([auth.getDashboardRoute()]);
};
