import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { URL_SERVICIOS } from '../../config/config';
import { BehaviorSubject, Subscription, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private sessionCheckSub?: Subscription;

  private userAuthSubject = new BehaviorSubject<any>({});
  userAuth$ = this.userAuthSubject.asObservable();

  startSessionCheck() {
    if (this.sessionCheckSub) return; // evitar duplicados

    this.sessionCheckSub = timer(0, 30000).subscribe(() => {
      this.showUser().subscribe({
        next: (resp: any) => {
          this.userAuthSubject.next(resp);
        },
        error: () => {
          localStorage.removeItem('AUTH_TOKEN');
          location.href = '/auth/login'; // forzar recarga o puedes usar router
        },
      });
    });
  }

  stopSessionCheck() {
    this.sessionCheckSub?.unsubscribe();
    this.sessionCheckSub = undefined;
  }

  showUser() {
    const URL = `${URL_SERVICIOS}/user`;
    return this.http.get(URL, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('AUTH_TOKEN'),
      }),
    });
  }

  register(data: FormGroup) {
    const URL = `${URL_SERVICIOS}/registro`;
    return this.http.post(URL, data);
  }

  login(data: FormGroup) {
    const URL = `${URL_SERVICIOS}/login`;
    return this.http.post(URL, data);
  }

  logout() {
    const URL = `${URL_SERVICIOS}/logout`;
    return this.http.post(
      URL,
      {},
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('AUTH_TOKEN'),
        }),
      }
    );
  }
}
