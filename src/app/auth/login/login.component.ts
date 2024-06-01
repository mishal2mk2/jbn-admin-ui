import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ILoginReponse } from '../auth.interface';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  roles: any;
  isLoggedIn: boolean = false;
  FormGroupData!:FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder:FormBuilder,
  ) {}
  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.router.navigate(['/']).then(() => {
        this.toastr.info('Already Logged in', 'INFO');
      });
    }else{
      this.FormGroupData = this.formBuilder.group({
        mail: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required,Validators.minLength(6)]],

      });
    }

  }
  onLogin(){
    if(this.FormGroupData.invalid){
      this.FormGroupData.markAllAsTouched();
      this.toastr.error("Fill creds properly!!")
      return;
    }
    const {mail,password} = this.FormGroupData.controls;
    const loginData = {mail:mail.value,password:password.value};
    this.authService.login(loginData).subscribe({
      next: (res) => {
        this.authService.saveUser(res);
        this.isLoggedIn = true;
        this.authService.decodeToken();
        this.router.navigate(['/']).then(() => {
          this.toastr.success('Logged In Successfully', 'Success');
        });
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error');
      },
    });
  }
}
