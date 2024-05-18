import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-5',
  templateUrl: './form-5.component.html',
  styleUrl: './form-5.component.css',
})
export class Form5Component implements OnInit {
  FormGroupData!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.FormGroupData = this.formBuilder.group({
      priority: ['', Validators.required],
      estimateDateOfArrival: ['', Validators.required],
      notes: [''],
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
