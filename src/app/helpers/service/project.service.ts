import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private AUTH_API = environment.API_ENDPOINT;
  $ProjectNavigateDataTransfer = new EventEmitter();

  constructor(private http: HttpClient) {}

  // create the project APO
  createProject(obj: any) {
    return this.http.post<any>(`${this.AUTH_API}/project/add`, obj);
  }

  // get all Project API data
  getAllProjects() {
    return this.http.post<any>(`${this.AUTH_API}/project/list`, {});
  }

  // get Project by ID API data
  getProjectById(id: string) {
    return this.http.post<any>(`${this.AUTH_API}/project/${id}`, {});
  }

  // Approve Status Drawing approve and submit API
  approveStatusDrawing(obj: any, orderID: string) {
    return this.http.post<any>(
      `${this.AUTH_API}/project/drawing-upload/${orderID}`,
      obj
    );
  }
}
