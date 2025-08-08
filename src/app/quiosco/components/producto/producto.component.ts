import { Component, Input } from '@angular/core';
import { Producto } from '../../../shared/data/productos';
import { MatDialog } from '@angular/material/dialog';
import { CategoriasService } from '../../../shared/services/categorias.service';
import { AdminService } from '../../admin/services/admin.service';

@Component({
  selector: 'app-producto',
  standalone: false,
  templateUrl: './producto.component.html',
  styles: ``,
})
export class ProductoComponent {
  @Input()
  public producto?: Producto;

  @Input()
  public botonAgregar = false;

  @Input()
  public botonDisponible = false;

  constructor(
    private dialog: MatDialog,
    private categoriasService: CategoriasService,
    private adminService: AdminService
  ) {}

  abrirModal() {
    this.categoriasService.abrirModal(this.producto);
  }

  handleClickDisponibilidad(id: number) {
    this.adminService.updateProducto(id).subscribe();
  }
}
