import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router:Router){}
  onSubmit(form:NgForm){
    console.log(form.value);
    const body = form.value;
    this.authService.register(body).subscribe({
      next: data =>{
        console.log(data);
        this.router.navigate(['/auth/login'])
        //show success notification
      },
      error: err=>{
        console.log(err);
        alert(err.error.message);
        //handle error here
        //show success notification
      }
    })
  }
}
