import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

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

  createItem(data: any) {
    http: return this.http.post<any>(`${this.AUTH_API}/item/add`, data);
  }

  updateItem(data: any) {
    const itemId = data._id;

    http: return this.http.put<any>(`${this.AUTH_API}/item/${itemId}`, data);
  }

  deleteItem(id: any) {
    http: return this.http.delete<any>(`${this.AUTH_API}/item/${id}`, {});
  }
}
