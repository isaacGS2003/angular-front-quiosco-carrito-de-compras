import { Component, Input } from '@angular/core';
import { Categoria } from '../../../shared/data/categorias';
import { CategoriasService } from '../../../shared/services/categorias.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categoria',
  standalone: false,
  templateUrl: './categoria.component.html',
  styles: ``,
})
export class CategoriaComponent {
  @Input()
  public categoria!: Categoria;

  categoriaActual$!: Observable<Categoria>;

  constructor(private categoriasService: CategoriasService) {
    this.categoriaActual$ = this.categoriasService.categoriaActual$;
  }
  seleccionarCategoria() {
    this.categoriasService.handleClickCategoria(this.categoria);
  }
}
