import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Categoria } from '../data/categorias';
import { NotificacionService } from './notificacion.service';
import { MatDialog } from '@angular/material/dialog';
import { MiModalComponent } from '../../quiosco/components/mi-modal/mi-modal.component';
import { QuioscoService } from '../../quiosco/services/quiosco.service';

@Injectable({ providedIn: 'root' })
export class CategoriasService {
  constructor(
    private notificacionService: NotificacionService,
    private dialog: MatDialog,
    private quioscoService: QuioscoService
  ) {
    this.pedidoActualSubject.asObservable().subscribe(() => {
      const nuevoTotal = this.calcularTotal();
      this.totalSubject.next(nuevoTotal);
    });

    this.quioscoService.indexCategoria().subscribe({
      next: (resp: any) => {
        this.categoriasData = resp.data;
        this.categoriasSubject.next(this.categoriasData);
        this.categoriaActualSubject.next(this.categoriasData[0]);
      },
    });
  }

  private categoriasData!: Categoria[];

  // Estado: lista de categorías
  private categoriasSubject = new BehaviorSubject<any>([]);
  categorias$ = this.categoriasSubject.asObservable();

  // Estado: categoría actual
  private categoriaActualSubject = new BehaviorSubject<any>({});
  categoriaActual$ = this.categoriaActualSubject.asObservable();

  // Estado: pedido actual
  private pedidoActualSubject = new BehaviorSubject<any>([]);
  pedidoActual$ = this.pedidoActualSubject.asObservable();

  private totalSubject = new BehaviorSubject<number>(0);
  total$ = this.totalSubject.asObservable();

  calcularTotal(): number {
    const pedidoActual = this.pedidoActualSubject.getValue();

    const nuevoTotal = pedidoActual.reduce(
      (total: any, producto: any) =>
        producto.precio * producto.cantidad + total,
      0
    );

    return nuevoTotal;
  }

  // Función: cambiar la categoría actual
  handleClickCategoria(categoria: Categoria) {
    this.categoriaActualSubject.next(categoria);
  }

  agregarProductoAlPedido(nuevoProducto: any) {
    const pedidoActual = this.pedidoActualSubject.getValue();

    if (
      pedidoActual.some(
        (pedidoState: any) => pedidoState.id === nuevoProducto.id
      )
    ) {
      const pedidoActualizado = pedidoActual.map((pedidoState: any) =>
        pedidoState.id === nuevoProducto.id ? nuevoProducto : pedidoState
      );
      this.pedidoActualSubject.next(pedidoActualizado);
      this.mostrarToast('Guardado correctamente');
    } else {
      this.pedidoActualSubject.next([...pedidoActual, nuevoProducto]);
      this.mostrarToast('Agregado al Pedido');
    }
  }

  resetearPedido() {
    this.pedidoActualSubject.next([]);
    this.totalSubject.next(0);
  }

  private mostrarToast(mensaje: string) {
    this.notificacionService.mostrarMensaje(mensaje);
  }

  handleEditarCantidad(id: string) {
    const pedidoActual = this.pedidoActualSubject.getValue();

    const productoActualizar = pedidoActual.filter(
      (producto: any) => producto.id === id
    )[0];
    this.abrirModal(productoActualizar);
  }
  abrirModal(producto: any) {
    this.dialog.open(MiModalComponent, {
      // width: '400px',
      maxWidth: '100%',
      data: {
        mensaje: 'Contenido del modal con Material',
        producto: producto,
      },
    });
  }

  handleEliminarProductoPedido(id: number) {
    const pedidoActual = this.pedidoActualSubject.getValue();
    const pedidoActualizado = pedidoActual.filter(
      (producto: any) => producto.id !== id
    );
    this.pedidoActualSubject.next(pedidoActualizado);
    this.mostrarToast('Eliminado del Pedido');
  }
}
