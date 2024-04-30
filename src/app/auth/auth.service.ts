import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginBody, ILoginReponse, IRegResponse, IRegisterBody } from './auth.interface';
// import { JwtHelperService } from '@auth0/angular-jwt';


const AUTH_API = 'http://localhost:3000/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

export const USER_KEY = 'auth-user';//used in session storage services

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(body: ILoginBody) {
    const url = AUTH_API + 'login';
    return this.http.post<ILoginReponse>(url, body, httpOptions);
  }
  register(body: IRegisterBody) {
    const url = AUTH_API + 'register';
    return this.http.post<IRegResponse>(url, body, httpOptions);
  }
  logout() {
    return this.http.post(AUTH_API + 'logout', {}, httpOptions);
  }

  // session storage services
  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    // const token = this.jwtHelper.decodeToken(user.data.token);
    // console.log(token);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));

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
}
