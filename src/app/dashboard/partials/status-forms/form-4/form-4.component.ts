import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-4',
  templateUrl: './form-4.component.html',
  styleUrl: './form-4.component.css',
})
export class Form4Component implements OnInit {
  FormGroupData!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.FormGroupData = this.formBuilder.group({
      transactionId: ['', Validators.required],
      dateOfTransaction: ['', Validators.required],
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
