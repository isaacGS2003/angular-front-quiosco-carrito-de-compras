import { Component } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-productos',
  standalone: false,
  template: `
    <p *ngIf="isLoading">Cargando</p>

    <ng-container *ngIf="!isLoading">
      <h1 class="text-4xl font-black">Productos</h1>
      <p class="text-2xl my-10">Maneja la disponibilidad desde aquí</p>

      <div class="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 pb-3">
        <ng-container *ngFor="let producto of productos">
          <!-- <div class="transition duration-300 hover:scale-105"> -->
          <app-producto
            [producto]="producto"
            [botonDisponible]="true"
          ></app-producto>
          <!-- </div> -->
        </ng-container>
      </div>
    </ng-container>
  `,
})
export class ProductosComponent {
  constructor(private adminService: AdminService) {
    adminService.productos$.subscribe({
      next: (resp: any) => {
        this.productos = resp.data;
        this.isLoading = false;
      },
    });
  }
  public productos?: any;
  public isLoading: boolean = true;
}
