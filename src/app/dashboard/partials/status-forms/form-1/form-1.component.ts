import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-1',
  templateUrl: './form-1.component.html',
  styleUrl: './form-1.component.css',
})
export class Form1Component implements OnInit {
  @Input() formData: any;

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
