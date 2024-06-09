import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private AUTH_API = environment.API_ENDPOINT;

  constructor(private http: HttpClient) { }

  // Get Status Count API
  statusCountDashboardAPI() {
    return this.http.get<any>(`${this.AUTH_API}/project/status-count`);
  }

  //spinner on and off
  isLoading(bool:Boolean) {
    if(bool){
      const backdrop = document.getElementById('modal-backdrop');
      backdrop?.classList.remove('hidden');
      const spinner = document.getElementById('spinner');
      spinner?.classList.remove('hidden');
      spinner?.classList.add('flex');
    }else{
      const backdrop = document.getElementById('modal-backdrop');
      backdrop?.classList.add('hidden');
      const spinner = document.getElementById('spinner');
      spinner?.classList.remove('flex');
      spinner?.classList.add('hidden');
    }
  }
}
