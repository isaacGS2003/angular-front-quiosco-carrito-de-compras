import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

export const authAdminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const token = localStorage.getItem('AUTH_TOKEN');
  if (!token) {
    router.navigate(['/auth/login']);
    return of(false);
  }

  return authService.showUser().pipe(
    map((user: any) => {
      if (user && user.admin === 1) {
        return true;
      }
      router.navigate(['/auth/login']);
      return false;
    }),
    catchError(() => {
      router.navigate(['/auth/login']);
      return of(false);
    })
  );
};
