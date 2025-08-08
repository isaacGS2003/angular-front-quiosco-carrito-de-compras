import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuioscoRoutingModule } from './quiosco-routing.module';
import { QuioscoComponent } from './quiosco.component';
import { InicioComponent } from './inicio/inicio.component';
import { ResumenComponent } from './components/resumen/resumen.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { ProductoComponent } from './components/producto/producto.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MiModalComponent } from './components/mi-modal/mi-modal.component';
import { ResumenPedidoComponent } from './components/resumen-pedido/resumen-pedido.component';
import { CustomToastComponent } from './components/custom-toast/custom-toast.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { OrdenesComponent } from './admin/ordenes/ordenes.component';
import { ProductosComponent } from './admin/productos/productos.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';

@NgModule({
  declarations: [
    QuioscoComponent,
    InicioComponent,
    ResumenComponent,
    SidebarComponent,
    CategoriaComponent,
    ProductoComponent,
    MiModalComponent,
    ResumenPedidoComponent,
    CustomToastComponent,
    LayoutComponent,
    OrdenesComponent,
    ProductosComponent,
    AdminSidebarComponent,
  ],
  imports: [
    CommonModule,
    QuioscoRoutingModule,

    MatDialogModule,
    MatSnackBarModule,
  ],
})
export class QuioscoModule {}
