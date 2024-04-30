import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(
    private authService: AuthService, 
    private router:Router,
    private toastr:ToastrService
  ){}
  onSubmit(form:NgForm){
    console.log(form.value);
    const body = form.value;
    this.authService.register(body).subscribe({
      next: data =>{
        console.log(data);
        this.router.navigate(['/auth/login']).then(()=>{
          this.toastr.success("Successfully Registered","Success")
        })
        //show success notification
      },
      error: err=>{
        this.toastr.error(err.error.message,"Error");
        //handle error here
        //show success notification
      }
    })
  }
}
