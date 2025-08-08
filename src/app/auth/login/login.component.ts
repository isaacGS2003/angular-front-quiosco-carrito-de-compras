import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.myForm = fb.group({
      email: ['correo@correo.com', []],
      password: ['123456I/', []],
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

    this.authService.login(this.myForm.value).subscribe({
      next: (resp: any) => {
        localStorage.setItem('AUTH_TOKEN', resp.token);
        this.errores = [];

        if (resp.user && resp.user.admin === 1) {
          this.router.navigate(['/admin']);
          return;
        }
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
