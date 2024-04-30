import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrl: './nav-header.component.css'
})
export class NavHeaderComponent implements OnInit {
  constructor(private authService:AuthService, private router:Router){
    
  }
  ngOnInit(): void {
  }

  logout(){
    this.authService.clean();
    window.location.reload();
    this.router.navigate(['/auth/login']);
  }
}
