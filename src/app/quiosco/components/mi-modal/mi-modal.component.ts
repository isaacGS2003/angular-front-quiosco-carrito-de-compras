import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Producto } from '../../../shared/data/productos';
import { CategoriasService } from '../../../shared/services/categorias.service';
import { Observable, first, firstValueFrom } from 'rxjs';

interface Data {
  mensaje: string;
  producto: Producto;
}

@Component({
  selector: 'app-mi-modal',
  standalone: false,
  template: `
    <mat-dialog-content>
      <div class="md:flex items-center gap-10">
        <div class="md:w-1/3">
          <img
            [src]="data.producto.imagen + '.jpg'"
            [alt]="'Imagen producto' + data.producto.nombre"
          />
        </div>

        <div class="md:w-2/3">
          <div class="flex justify-end">
            <button type="button" (click)="cerrar()">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>

          <h1 class="text-3xl font-bold mt-5">
            {{ data.producto.nombre }}
          </h1>

          <p class="mt-5 font-bold text-5xl text-amber-500">
            {{ data.producto.precio | currency }}
          </p>

          <div class="flex gap-4 mt-5">
            <button type="button" (click)="decrementar()">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>

            <p>{{ cantidad }}</p>

            <button type="button" (click)="incrementar()">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>

          <button
            type="button"
            class="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded"
            (click)="agregarProductoAlPedido(this.cantidad)"
          >
            {{ edicion ? 'Guardar Cambios' : 'Añadir al Pedido' }}
          </button>
        </div>
      </div>
    </mat-dialog-content>

    <!-- <h2 mat-dialog-title>Hola!</h2>
    <mat-dialog-content>
      {{ data.mensaje }}
      <p>{{ data.producto.nombre }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="cerrar()">Cerrar</button>
    </mat-dialog-actions> -->
  `,
})
export class MiModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<MiModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private categoriasService: CategoriasService
  ) {
    this.pedidos$ = categoriasService.pedidoActual$;
  }
  ngOnInit(): void {
    this.comprobar();
  }

  public pedidos$?: Observable<any>;

  async comprobar() {
    const pedidos = await firstValueFrom(this.pedidos$!);
    this.pedidos$?.pipe(first()).subscribe((pedido) => {
      if (
        pedido.some(
          (pedidoState: any) => pedidoState.id === this.data.producto.id
        )
      ) {
        const productoEdicion = pedidos.filter(
          (pedidoState: any) => pedidoState.id === this.data.producto.id
        )[0];
        this.cantidad = productoEdicion.cantidad;
        this.edicion = true;
      }
    });
  }

  agregarProductoAlPedido(cantidad: any) {
    this.categoriasService.agregarProductoAlPedido({
      ...this.data.producto,
      cantidad,
    });
    this.cerrar();
  }

  public cantidad: number = 1;
  public edicion: boolean = false;

  cerrar() {
    this.dialogRef.close();
  }

  incrementar() {
    if (this.cantidad >= 5) return;
    this.cantidad++;
  }

  decrementar() {
    if (this.cantidad <= 1) return;
    this.cantidad--;
  }
}
