import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomToastComponent } from '../../quiosco/components/custom-toast/custom-toast.component';

@Injectable({
  providedIn: 'root',
})
export class NotificacionService {
  constructor(private snackBar: MatSnackBar) {}

  mostrarMensaje(mensaje: string, duracion: number = 100000) {
    this.snackBar.openFromComponent(CustomToastComponent, {
      duration: duracion,
      data: mensaje, // Pasamos el mensaje como dato
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar'],
    });
  }
}
