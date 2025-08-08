import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './quiosco/admin/layout/layout.component';
import { OrdenesComponent } from './quiosco/admin/ordenes/ordenes.component';
import { ProductosComponent } from './quiosco/admin/productos/productos.component';
import { authAdminGuard } from './shared/guards/auth-admin.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./quiosco/quiosco.module').then((m) => m.QuioscoModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [authAdminGuard],
    children: [
      {
        path: '',
        component: OrdenesComponent,
      },
      {
        path: 'productos',
        component: ProductosComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
