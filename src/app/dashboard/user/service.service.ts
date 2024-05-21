import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from './user.interface';
import { getNsPrefix } from '@angular/compiler';


const PREFIX_PATH = 'http://localhost:3000/user';
const httpOptions = {
  headers : new HttpHeaders({'Content-Type':'application/json'}),
}

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  getUserLIst(){
    const url = PREFIX_PATH +'/list';
    return this.http.post<{data:IUser[]}>(url,{});
  }
  updateUser(id:string,role:string){
    const url = PREFIX_PATH +`/${id}`
    return this.http.put(url,{role});
  }
  blockUser(id:string){
    const url = PREFIX_PATH +`/block/${id}`;
    return this.http.get(url);
  }
  unBlockUser(id:string){
      const url = PREFIX_PATH +`/unblock/${id}`;
    return this.http.get(url);
  }
}
