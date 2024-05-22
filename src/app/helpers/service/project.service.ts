import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  // headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private AUTH_API = environment.API_ENDPOINT;

  constructor(private http: HttpClient) {}

  createProject(obj: any) {
    return this.http.post<any>(`${this.AUTH_API}/project/add`, obj);
  }
}
