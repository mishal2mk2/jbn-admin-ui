import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ILoginBody,
  ILoginReponse,
  IRegResponse,
  IRegisterBody,
} from './auth.interface';
import * as jwt_decode from 'jwt-decode';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

export const USER_KEY = '_TOKEN'; //used in session storage services
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private AUTH_API = environment.API_ENDPOINT;

  jwtToken: string | null = null;
  decodedToken: any;
  role: string | null = null;

  constructor(private http: HttpClient) {}

  login(body: any) {
    const url = this.AUTH_API + '/auth/login';
    return this.http.post<ILoginReponse>(url, body, httpOptions);
  }

  register(body: any) {
    const url = this.AUTH_API + '/auth/register';
    return this.http.post<IRegResponse>(url, body, httpOptions);
  }

  logout() {
    return this.http.post(this.AUTH_API + '/auth/logout', {}, httpOptions);
  }

  // session storage services
  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);

    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user.data.token));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }

  decodeToken() {
    this.jwtToken = window.sessionStorage.getItem(USER_KEY);

    if (this.jwtToken) {
      this.decodedToken = jwt_decode.jwtDecode(JSON.parse(this.jwtToken));
      this.role = this.decodedToken.role;
    }
  }
}
