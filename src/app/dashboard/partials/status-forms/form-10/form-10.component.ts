import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidationService } from '../../../../helpers/service/form-validation.service';

@Component({
  selector: 'app-form-10',
  templateUrl: './form-10.component.html',
  styleUrl: './form-10.component.css',
})
export class Form10Component implements OnInit {
  FormGroupData!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _FormValidationService: FormValidationService
  ) {}

  ngOnInit(): void {
    this.FormGroupData = this.formBuilder.group({
      serviceReport: ['', Validators.required],
      closingReport: ['', Validators.required],
      notes: [''],
    });
  }

  // Validate File size on Add file
  validateFileSize(event: Event, type: string) {
    // Check the File size more the 5mb and if true
    const { files } = event.target as HTMLInputElement;

    if (files) {
      // Check the is File
      if (!this._FormValidationService.isValidImagePdfFileType(files)) {
        this.FormGroupData.patchValue({
          [type]: '',
        });

        this.FormGroupData.controls[type].setErrors({
          invalidFile: true,
        });

        return;
      }

      // Check the File size
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      const selectFile = files[0];

      if (selectFile?.size > maxSize) {
        this.FormGroupData.patchValue({
          [type]: '',
        });

        this.FormGroupData.controls[type].setErrors({
          maxSize: true,
        });
      }
    }
  }

  formSubmit() {
    // Check the form validation is complete
    if (this.FormGroupData.invalid) {
      this.FormGroupData.markAllAsTouched();
      return;
    }
  }
}
