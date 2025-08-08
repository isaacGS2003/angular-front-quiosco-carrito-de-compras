import { Component } from '@angular/core';
import {
  Observable,
  catchError,
  combineLatest,
  map,
  of,
  switchMap,
  tap,
  timer,
} from 'rxjs';
import { Producto } from '../../shared/data/productos';
import { Categoria } from '../../shared/data/categorias';
import { CategoriasService } from '../../shared/services/categorias.service';
import { QuioscoService } from '../services/quiosco.service';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.component.html',
  styles: ``,
})
export class InicioComponent {
  private productos: Producto[] = [];

  public isFirstLoad: boolean = true;
  public productosFiltrados$?: Observable<Producto[]>;
  public categoriaActual$!: Observable<Categoria>;

  constructor(
    private categoriasService: CategoriasService,
    private quioscoService: QuioscoService
  ) {
    this.categoriaActual$ = this.categoriasService.categoriaActual$;

    timer(0, 5000)
      .pipe(
        tap(() => {
          if (this.isFirstLoad) {
            this.isFirstLoad = true;
          }
        }),
        switchMap(() =>
          this.quioscoService.indexProducto().pipe(
            catchError((error) => {
              console.error('Error al cargar productos', error);
              this.isFirstLoad = false;
              return of({ data: [] });
            })
          )
        ),
        tap((resp: any) => {
          this.productos = resp.data;
          this.isFirstLoad = false;
        }),
        switchMap(() =>
          combineLatest([this.categoriasService.categoriaActual$]).pipe(
            map(([categoriaActual]) =>
              this.productos.filter(
                (producto) => producto.categoria_id === categoriaActual.id
              )
            )
          )
        )
      )
      .subscribe((productosFiltrados) => {
        this.productosFiltrados$ = of(productosFiltrados);
      });
  }
}
