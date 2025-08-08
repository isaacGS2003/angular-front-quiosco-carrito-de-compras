import { Component } from '@angular/core';
import { CategoriasService } from '../../../shared/services/categorias.service';
import { Observable } from 'rxjs';
import { Categoria } from '../../../shared/data/categorias';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styles: ``,
})
export class SidebarComponent {
  categorias$: Observable<Categoria[]>;
  public userAuth: any;

  constructor(
    private categoriasService: CategoriasService,
    private authService: AuthService,
    private router: Router
  ) {
    this.categorias$ = this.categoriasService.categorias$;
    this.authService.userAuth$.subscribe((resp: any) => {
      this.userAuth = resp;
    });
  }
  logout() {
    this.authService.logout().subscribe({
      next: (resp) => {
        localStorage.removeItem('AUTH_TOKEN');
        this.authService.stopSessionCheck();
        // this.router.navigate(['/auth/login']);
        location.href = '/auth/login';
      },
    });
  }
}
