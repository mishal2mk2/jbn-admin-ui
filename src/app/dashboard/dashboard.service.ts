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

  //spinner on and off
  isLoading(isLoadStart: Boolean, wantRemoveOverLay: boolean = true) {
    if (isLoadStart) {
      const spinner = document.getElementById('spinner');
      const modalOverlay = document.getElementById('modal-backdrop');

      if (modalOverlay && spinner) {
        //modal toggle settings
        spinner.classList.remove('hidden');
        modalOverlay.classList.remove('hidden');
      }
    } else {
      const spinner = document.getElementById('spinner');
      const modalOverlay = document.getElementById('modal-backdrop');

      if (modalOverlay && spinner) {
        //modal toggle settings
        spinner.classList.add('hidden');

        if (wantRemoveOverLay) modalOverlay.classList.add('hidden');
      }
    }
  }
}
