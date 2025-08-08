import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-quiosco',
  standalone: false,
  templateUrl: './quiosco.component.html',
  styles: ``,
})
export class QuioscoComponent implements OnInit {
  constructor(private authService: AuthService) {
    this.authService.startSessionCheck();
    this.userAuth$ = this.authService.userAuth$;
  }
  ngOnInit(): void {
    console.log(this.userAuth$);
  }

  public userAuth$: Observable<any>;
}
