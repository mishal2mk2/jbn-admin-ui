import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const PREFIX_PATH = 'http://localhost:3000'
@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private http: HttpClient) { }

  getItemList(){
    const url = PREFIX_PATH+'/item/list';
    return this.http.post(url,{});
  }

  createItem(data:any){
    const url = PREFIX_PATH+'/item/add'
    return this.http.post(url,data);
  }


  updateItem(data:any){
    const itemId = data._id
    const url = PREFIX_PATH+`/item/${itemId}`
    return this.http.put(url,data);
  }
  
  deleteItem(id:any){
    const url = PREFIX_PATH+`/item/${id}`
    return this.http.delete(url,{});
  }
}
