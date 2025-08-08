import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root',
})
export class QuioscoService {
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('AUTH_TOKEN'),
    });
  }

  indexCategoria() {
    const URL = `${URL_SERVICIOS}/categorias`;
    return this.http.get(URL, { headers: this.getHeaders() });
  }

  indexProducto() {
    const URL = `${URL_SERVICIOS}/productos`;
    return this.http.get(URL, { headers: this.getHeaders() });
  }

  storePedido(data: any) {
    const URL = `${URL_SERVICIOS}/pedido`;
    return this.http.post(URL, data, { headers: this.getHeaders() });
  }
}
