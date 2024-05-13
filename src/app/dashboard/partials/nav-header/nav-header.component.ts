import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrl: './nav-header.component.css'
})
export class NavHeaderComponent implements OnInit {
  userDropdownOpen: boolean = false;
  constructor(private authService:AuthService, private router:Router){
  }

  ngOnInit(): void {
  }

  toggleUserDropdown() {
      this.userDropdownOpen = !this.userDropdownOpen;
  }

  navToCreate(){
    this.router.navigate(['/project/create']);
  }

  logout(){
    this.authService.clean();
    window.location.reload();
    this.router.navigate(['/auth/login']);
  }
}
