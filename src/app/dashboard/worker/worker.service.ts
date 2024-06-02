import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  private AUTH_API = environment.API_ENDPOINT;

  constructor(private http: HttpClient) { }

  // Get all Material data API
  getWorkerList() {
    http: return this.http.post<any>(`${this.AUTH_API}/emp/list`, {});
  }

  createWorker(data: any) {
    http: return this.http.post<any>(`${this.AUTH_API}/emp/add`, data);
  }

  updateWorker(data: any) {
    const workerId = data._id;

    http: return this.http.put<any>(`${this.AUTH_API}/emp/${workerId}`, data);
  }

  deleteWorker(id: any) {
    http: return this.http.delete<any>(`${this.AUTH_API}/emp/${id}`, {});
  }
}
