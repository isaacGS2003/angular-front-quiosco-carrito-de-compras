import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-ordenes',
  standalone: false,
  template: `
    <p *ngIf="isLoading">Cargando</p>

    <ng-container *ngIf="!isLoading">
      <h1 class="text-4xl font-black">Ordenes</h1>
      <p class="text-2xl my-10">Administra las ordenes desde aquí</p>

      <div class="grid grid-cols-2 gap-5">
        <div
          *ngFor="let pedido of pedidos.data"
          class="p-5 bg-white shadow space-y-2 border-b"
        >
          <p class="text-xl font-bold text-slate-600">Contenido del Pedido:</p>

          <div
            *ngFor="let producto of pedido.productos"
            class="border-b border-b-slate-200 last-of-type:border-none py-4"
          >
            <p class="text-sm">ID: {{ producto.id }}</p>
            <p>{{ producto.nombre }}</p>
            <p>
              Cantidad: {{ '' }}
              <span class="font-bold">{{ producto.pivot.cantidad }}</span>
            </p>
          </div>

          <p class="text-lg font-bold text-slate-600">
            Cliente: <span class="font-normal">{{ pedido.user.name }}</span>
          </p>

          <p class="text-lg font-bold text-amber-500">
            Total a Pagar:
            <span class="font-normal text-slate-600">{{
              pedido.total | currency
            }}</span>
          </p>

          <button
            type="button"
            class="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 rounded uppercase font-bold text-white text-center w-full cursor-pointer"
            (click)="handleClickcompletarPedido(pedido.id)"
          >
            Completar
          </button>
        </div>
      </div>
    </ng-container>
  `,
})
export class OrdenesComponent implements OnInit {
  constructor(private adminService: AdminService) {
    this.adminService.pedidos$.subscribe({
      next: (resp: any) => {
        this.pedidos = resp;
        this.isLoading = false;
      },
    });
  }
  ngOnInit(): void {}
  public pedidos: any;
  public isLoading: boolean = true;

  handleClickcompletarPedido(id: number) {
    this.adminService.updatePedido(id).subscribe({
      next: (resp: any) => {
        console.log(resp);
      },
    });
  }
}
