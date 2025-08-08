import { Component } from '@angular/core';
import { CategoriasService } from '../../../shared/services/categorias.service';
import { Observable } from 'rxjs';
import { QuioscoService } from '../../services/quiosco.service';
import { NotificacionService } from '../../../shared/services/notificacion.service';

@Component({
  selector: 'app-resumen',
  standalone: false,
  templateUrl: './resumen.component.html',
  styles: ``,
})
export class ResumenComponent {
  public pedido: any;
  public totalPagar: number = 0;
  constructor(
    private categoriasService: CategoriasService,
    private quioscoService: QuioscoService,
    private notificacionService: NotificacionService
  ) {
    categoriasService.pedidoActual$.subscribe({
      next: (resp: any) => {
        this.pedido = resp;
      },
    });
    categoriasService.total$.subscribe({
      next: (resp: any) => {
        this.totalPagar = resp;
      },
    });
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    // console.log(this.pedido$);
    const data = {
      total: this.totalPagar,
      productos: this.pedido.map((producto: any) => {
        return { id: producto.id, cantidad: producto.cantidad };
      }),
    };
    this.quioscoService.storePedido(data).subscribe({
      next: (resp: any) => {
        setTimeout(() => {
          this.categoriasService.resetearPedido();
        }, 1000);
        this.notificacionService.mostrarMensaje(resp.message);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
