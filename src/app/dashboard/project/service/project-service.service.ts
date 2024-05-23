import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const PREFIX_PATH = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {

  constructor(private http:HttpClient) { }

  getProjectDetails(id:any){
    const url= PREFIX_PATH + `/project/${id}`
    return this.http.post(url,{});
  }
}
