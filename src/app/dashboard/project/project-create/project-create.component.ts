import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../../helpers/service/project.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.css',
})
export class ProjectCreateComponent implements OnInit {
  FormGroupData!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _ProjectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.FormGroupData = this.formBuilder.group({
      clientName: ['', Validators.required, Validators.minLength(4)],
      clientPhone: ['', Validators.required],
      clientEmail: ['', Validators.required],
      addressCity: ['', Validators.required],
      addressLocation: ['', Validators.required],
      notes: [''],
      descriptions: [''],
    });

    // const token = window.sessionStorage.getItem('_TOKEN');

    // if (token) {
    //   const decodedToken = jwt_decode.jwtDecode(JSON.parse(token));
    //   console.log(decodedToken);
    // }
  }

  formSubmit() {
    // Check the form validation is complete
    if (this.FormGroupData.invalid) {
      this.FormGroupData.markAllAsTouched();
      return;
    }
  }
}
