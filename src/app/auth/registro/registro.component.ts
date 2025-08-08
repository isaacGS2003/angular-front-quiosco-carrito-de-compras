import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: false,
  templateUrl: './registro.component.html',
  styles: ``,
})
export class RegistroComponent {
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.myForm = fb.group({
      name: ['Isaac', []],
      email: ['correo@correo.com', []],
      password: ['123456I/', []],
      password_confirmation: ['123456I/', []],
    });
  }

  public myForm: FormGroup;
  public errores = [];

  handleSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      console.log('invalid');
      return;
    }

    this.authService.register(this.myForm.value).subscribe({
      next: (resp: any) => {
        localStorage.setItem('AUTH_TOKEN', resp.token);
        this.errores = [];
        this.router.navigate(['/']);
      },
      error: (error) => {
        if (error.status === 422) {
          this.errores = Object.values(error.error.errors);
          return;
        }
      },
    });
  }
}
