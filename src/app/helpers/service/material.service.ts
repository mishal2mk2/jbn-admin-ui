import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  private AUTH_API = environment.API_ENDPOINT;

  constructor(private http: HttpClient) {}

  // Get all Material data API
  getAllMaterialData() {
    http: return this.http.post<any>(`${this.AUTH_API}/item/list`, {});
  }
}
