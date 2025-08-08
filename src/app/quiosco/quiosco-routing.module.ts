import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuioscoComponent } from './quiosco.component';
import { InicioComponent } from './inicio/inicio.component';
import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: QuioscoComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: InicioComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuioscoRoutingModule {}
