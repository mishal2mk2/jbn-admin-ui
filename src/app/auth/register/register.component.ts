import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  FormGroupData!: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']).then(() => {
        this.toastr.info('Already Logged in', 'INFO');
      });
    } else {
      this.FormGroupData = this.formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(4)]],
        mail: ['', [Validators.required, Validators.email]],
        mobile: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      });
    }
  }

  onRegister() {
    if (this.FormGroupData.invalid) {
      this.FormGroupData.markAsTouched();
      this.toastr.error("Fill Registration Properly!!");
      return;
    }
    const { username, mail, mobile, password } = this.FormGroupData.controls;
    const regData = { username: username.value, mail: mail.value, mobile: mobile.value, password: password.value };
    this.authService.register(regData).subscribe({
      next: (data) => {
        this.router.navigate(['/auth/login']).then(() => {
          this.toastr.success('Successfully Registered', 'Success');
        });
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error');

      },
    });
  }

}
