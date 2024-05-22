import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.css',
})
export class ProjectCreateComponent implements OnInit {
  FormGroupData!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.FormGroupData = this.formBuilder.group({
      clientName: ['', Validators.required, Validators.minLength(4)],
      clientPhone: ['', Validators.required],
      addressCity: ['', Validators.required],
      addressLocation: ['', Validators.required],
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
  }
}
