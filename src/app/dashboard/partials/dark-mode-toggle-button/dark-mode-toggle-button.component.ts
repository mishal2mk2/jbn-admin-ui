import { Component } from '@angular/core';
import { DarkmodeService } from '../../../helpers/service/darkmode.service';

@Component({
  selector: 'app-dark-mode-toggle-button',
  templateUrl: './dark-mode-toggle-button.component.html',
  styleUrl: './dark-mode-toggle-button.component.css'
})
export class DarkModeToggleButtonComponent {
  constructor(public darkModeService: DarkmodeService) { }

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }
}
