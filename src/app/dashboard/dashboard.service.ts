import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private AUTH_API = environment.API_ENDPOINT;

  constructor(private http: HttpClient) {}

  // Get Status Count API
  statusCountDashboardAPI() {
    return this.http.get<any>(`${this.AUTH_API}/project/status-count`);
  }
}
