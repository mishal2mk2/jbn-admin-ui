import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-7',
  templateUrl: './form-7.component.html',
  styleUrl: './form-7.component.css',
})
export class Form7Component implements OnInit {
  FormGroupData!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.FormGroupData = this.formBuilder.group({
      deliveryVehicleNumber: ['', Validators.required, Validators.minLength(4)],
      driverNumber: ['', Validators.required, Validators.minLength(4)],
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
