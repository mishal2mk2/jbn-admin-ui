import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ILoginReponse } from '../auth.interface';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../helpers/service/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  roles: any;
  isLoggedIn: boolean = false;
  FormGroupData!: FormGroup;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private _AuthService: AuthService,
    private _CommonService: CommonService
  ) {}

  ngOnInit(): void {
    if (this._AuthService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.router.navigate(['/']).then(() => {
        this.toastr.info('Already Logged in', 'INFO');
      });
    } else {
      this.FormGroupData = this.formBuilder.group({
        mail: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      });
    }
  }

  onLogin() {
    if (this.FormGroupData.invalid) {
      this.FormGroupData.markAllAsTouched();
      this.toastr.error('Fill creds properly!!');
      return;
    }
    const { mail, password } = this.FormGroupData.controls;
    const loginData = { mail: mail.value, password: password.value };
    this._AuthService.login(loginData).subscribe({
      next: (res) => {
        this._AuthService.saveUser(res);
        this.isLoggedIn = true;
        this._AuthService.decodeToken();

        // Check the role based navigation
        const userData = this._CommonService.getAllUserData();

        if (userData) {
          const { role } = userData;

          if (role === 'US' || role === 'WR') {
            this.router.navigate(['/basic-user']);
          } else if (role === 'CU') {
            this.router.navigate(['/customer']);
          } else {
            this.router.navigate(['/']);
          }

          this.toastr.success('Logged In Successfully', 'Success');
        }
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error');
      },
    });
  }
}
