// guest.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({ providedIn: 'root' })
export class GuestGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    const token = localStorage.getItem('AUTH_TOKEN');
    if (!token) {
      return of(true); // Si no hay token, puede pasar
    }

    return this.authService.showUser().pipe(
      map((user: any) => {
        if (user && user.id) {
          this.router.navigate(['/']); // Si ya está logueado, redirigir al home u otra ruta
          return false;
        }
        return true; // Si no está autenticado, permitir el acceso
      }),
      catchError(() => of(true)) // Si falla, asumir que no está autenticado
    );
  }
}
