import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    // Si no hay token, redirigir directamente
    const token = localStorage.getItem('AUTH_TOKEN');
    if (!token) {
      this.router.navigate(['/auth/login']);
      return of(false);
    }

    // Validación con el backend
    return this.authService.showUser().pipe(
      map((user: any) => {
        if (user && user.id) {
          return true;
        }
        this.router.navigate(['/auth/login']);
        return false;
      }),
      catchError(() => {
        this.router.navigate(['/auth/login']);
        return of(false);
      })
    );
  }
}
