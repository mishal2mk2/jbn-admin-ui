import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.router.navigate(['/']).then(() => {
        this.toastr.info('Already Logged in', 'INFO');
      });
    }
  }
  onSubmit(form: NgForm) {
    const body = form.value;
    this.authService.login(body).subscribe({
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
