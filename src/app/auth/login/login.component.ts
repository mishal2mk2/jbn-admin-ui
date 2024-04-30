import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ILoginReponse } from '../auth.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  roles: any;
  isLoggedIn: boolean=false;
  constructor(private authService: AuthService,private router:Router){

  }
  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.isLoggedIn = true;
      // this.roles = this.authService.getUser().roles;
      this.router.navigate(['/'])
    }
  }
  onSubmit(form: NgForm){
    console.log(form);
    console.log(form.value);
    const body=form.value;
    this.authService.login(body).subscribe({
      next:res=>{
        console.log(res.data.token);
        this.authService.saveUser(res);
        this.isLoggedIn = true
        // this.roles = this.authService.getUser().roles;
        this.reloadPage();
        this.router.navigate(['/'])
      },
      error:err=>{
        alert(err.error.message);
      }
    })
  }
  reloadPage(): void {
    window.location.reload();
  }
}
