import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-admin-sidebar',
  standalone: false,
  template: `
    <aside class="md:w-72 h-screen">
      <div class="p-4">
        <img src="logo.svg" alt="imagen logo" class="w-40" />
      </div>

      <nav class="flex flex-col p-4">
        <a routerLink="/admin" class="font-bold text-lg">Ordenes</a>
        <a routerLink="/admin/productos" class="font-bold text-lg">Productos</a>
      </nav>

      <div class="my-5 px-5">
        <button
          type="button"
          class="text-center bg-red-500 w-full p-3 font-bold text-white truncate"
          (click)="logout()"
        >
          Cerrar Sesión
        </button>
      </div>
    </aside>
  `,
})
export class AdminSidebarComponent {
  constructor(private authService: AuthService) {}
  logout() {
    this.authService.logout().subscribe({
      next: (resp) => {
        localStorage.removeItem('AUTH_TOKEN');
        this.authService.stopSessionCheck();
        // this.router.navigate(['/auth/login']);
        location.href = '/auth/login';
      },
    });
  }
}
