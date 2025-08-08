import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { AlertaComponent } from '../quiosco/components/alerta/alerta.component';

@NgModule({
  declarations: [AuthComponent, LoginComponent, RegistroComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    AlertaComponent,
  ],
})
export class AuthModule {}
