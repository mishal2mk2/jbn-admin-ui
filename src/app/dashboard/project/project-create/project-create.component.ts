import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../service/project.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.css',
})
export class ProjectCreateComponent implements OnInit {
  FormGroupData!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private _ProjectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.FormGroupData = this.formBuilder.group({
      clientName: ['', [Validators.required, Validators.minLength(4)]],
      clientPhone: ['', [Validators.required,Validators.minLength(10)]],
      clientEmail: ['', [Validators.required, Validators.email]],
      addressCity: ['', [Validators.required]],
      addressLocation: ['', Validators.required],
      addressLocationLink: ['', Validators.required],
      notes: [''],
      descriptions: [''],
    });
  }

  formSubmit() {
    // Check the form validation is complete
    if (this.FormGroupData.invalid) {
      this.FormGroupData.markAllAsTouched();
      return;
    }

    const {
      clientName,
      clientPhone,
      clientEmail,
      addressCity,
      addressLocation,
      addressLocationLink,
      notes,
      descriptions,
    } = this.FormGroupData.controls;

    const object = {
      client: {
        name: clientName.value,
        mob: clientPhone.value,
        email: clientEmail.value,
        add: {
          city: addressCity.value,
          location: addressLocation.value,
          link: addressLocationLink.value,
        },
      },
      notes: notes.value,
      description: descriptions.value,
    };

    this._ProjectService.createProject(object).subscribe({
      next: (res) => {
        this.router.navigate(['project']).then(() => {
          this.toastr.success('Successfully created new project', 'Success');
        });
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error');
      },
    });
  }
}
