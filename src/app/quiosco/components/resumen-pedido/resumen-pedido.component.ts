import { Component, Input, OnInit } from '@angular/core';
import { Pedido } from '../../../shared/interfaces/pedido';
import { CategoriasService } from '../../../shared/services/categorias.service';

@Component({
  selector: 'app-resumen-pedido',
  standalone: false,
  templateUrl: './resumen-pedido.component.html',
  styles: ``,
})
export class ResumenPedidoComponent implements OnInit {
  ngOnInit(): void {}

  constructor(private categoriasService: CategoriasService) {}

  @Input()
  public producto?: any;

  editarCantidad() {
    this.categoriasService.handleEditarCantidad(this.producto.id);
  }

  eliminarProductoPedido() {
    this.categoriasService.handleEliminarProductoPedido(this.producto.id);
  }
}
