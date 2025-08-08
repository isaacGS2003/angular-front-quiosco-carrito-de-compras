import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-layout',
  standalone: false,
  template: `
    <div class="md:flex">
      <app-admin-sidebar></app-admin-sidebar>

      <main class="flex-1 h-screen overflow-y-scroll bg-gray-100 p-3">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
})
export class LayoutComponent {
  constructor(
    private authService: AuthService,
    private adminService: AdminService
  ) {
    this.authService.startSessionCheck();
    this.adminService.startPedidosCheck();
  }
}
