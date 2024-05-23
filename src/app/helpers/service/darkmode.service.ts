import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkmodeService {
  private darkMode: boolean = false;

  constructor() {
    this.darkMode = localStorage.getItem('darkMode') === 'true';
    this.applyMode();
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    localStorage.setItem('darkMode', this.darkMode.toString());
    this.applyMode();
  }

  isDarkMode(): boolean {
    return this.darkMode;
  }

  private applyMode() {
    if (this.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
