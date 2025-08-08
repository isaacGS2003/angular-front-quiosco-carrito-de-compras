import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, timer } from 'rxjs';
import { URL_SERVICIOS } from '../../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QuioscoService } from '../../services/quiosco.service';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private pedidosCheckSub?: Subscription;

  private pedidosSubject = new BehaviorSubject<any>([]);
  public pedidos$ = this.pedidosSubject.asObservable();

  private productosSubject = new BehaviorSubject<any>([]);
  public productos$ = this.productosSubject.asObservable();

  constructor(
    private http: HttpClient,
    private quioscoService: QuioscoService
  ) {}

  startPedidosCheck() {
    if (this.pedidosCheckSub) return; // Evita duplicar la suscripción

    this.pedidosCheckSub = timer(0, 5000).subscribe(() => {
      this.indexPedido().subscribe({
        next: (resp: any) => {
          this.pedidosSubject.next(resp); // Emitimos la nueva lista de pedidos
        },
        error: (err) => {
          console.error('Error al obtener pedidos', err);
          // Aquí puedes manejar redirección o limpieza si es necesario
        },
      });

      this.quioscoService.indexProducto().subscribe({
        next: (resp: any) => {
          this.productosSubject.next(resp);
        },
        error: (err) => {
          console.error('Error al obtener pedidos', err);
          // Aquí puedes manejar redirección o limpieza si es necesario
        },
      });
    });
  }

  stopPedidosCheck() {
    this.pedidosCheckSub?.unsubscribe();
    this.pedidosCheckSub = undefined;
  }

  indexPedido() {
    const URL = `${URL_SERVICIOS}/pedido`;
    return this.http.get(URL, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`,
      }),
    });
  }

  updatePedido(id: number) {
    const URL = `${URL_SERVICIOS}/pedido/${id}`;
    return this.http.put(
      URL,
      {},
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`,
        }),
      }
    );
  }

  updateProducto(id: number) {
    const URL = `${URL_SERVICIOS}/productos/${id}`;
    return this.http.put(
      URL,
      {},
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`,
        }),
      }
    );
  }
}
