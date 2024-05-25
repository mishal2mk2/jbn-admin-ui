import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidationService } from '../../../../helpers/service/form-validation.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../../helpers/service/project.service';

@Component({
  selector: 'app-form-10',
  templateUrl: './form-10.component.html',
  styleUrl: './form-10.component.css',
})
export class Form10Component implements OnInit, OnChanges {
  @Input() isRefreshDataInput!: number;

  FormGroupData!: FormGroup;
  serviceFileToUpload: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private _FormValidationService: FormValidationService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private _ProjectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.FormGroupData = this.formBuilder.group({
      serviceReport: ['', Validators.required],
      notes: [''],
    });

    // Take the Project Data
    const { id } = this.route.snapshot.queryParams;
    this._ProjectService.getProjectById(id).subscribe((res) => {
      if (res.data.attachments.serviceReportFile.length) {
        // Set the form data
        this.FormGroupData = this.formBuilder.group({
          serviceReport: [''],
          notes: [res.data.notes],
        });
      } else {
        // Set the form data
        this.FormGroupData = this.formBuilder.group({
          serviceReport: ['', Validators.required],
          notes: [res.data.notes],
        });
      }
    });
  }

  ngOnChanges(changes: any): void {
    if (changes.isRefreshDataInput) {
      this.ngOnInit();
    }
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
        return;
      }

      this.serviceFileToUpload = files[0];
    }
  }

  formSubmit(type: string) {
    // Check the form validation is complete
    if (this.FormGroupData.invalid) {
      this.FormGroupData.markAllAsTouched();
      return;
    }

    const { notes } = this.FormGroupData.controls;

    const form = new FormData();

    if (this.serviceFileToUpload) {
      form.append('service', this.serviceFileToUpload);
    }
    form.append('isApproved', String(type === 'SUBMIT' ? false : true));
    form.append('notes', notes.value);

    // Take the Project ID form the query params
    const { id } = this.route.snapshot.queryParams;

    // Send the APi for change the Status or submit
    this._ProjectService.approveStatusService(form, id).subscribe({
      next: () => {
        this.toastr.success('Successfully update project status', 'Success');
        this._ProjectService.$ProjectNavigateDataTransfer.emit();
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error');
      },
    });
  }
}
