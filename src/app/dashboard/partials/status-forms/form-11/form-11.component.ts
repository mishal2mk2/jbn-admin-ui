import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormValidationService } from '../../../../helpers/service/form-validation.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../project/service/project.service';

@Component({
  selector: 'app-form-11',
  templateUrl: './form-11.component.html',
  styleUrl: './form-11.component.css',
})
export class Form11Component implements OnInit, OnChanges {
  @Input() isRefreshDataInput!: number;
  @Input() isApproveBtnShow!: boolean;

  FormGroupData!: FormGroup;
  closeFileToUpload: File | null = null;
  closeFileArray: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private _FormValidationService: FormValidationService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private _ProjectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.FormGroupData = this.formBuilder.group({
      closingReport: ['', Validators.required],
      notes: [''],
    });

    // Take the Project Data
    const { id } = this.route.snapshot.queryParams;
    this._ProjectService.getProjectById(id).subscribe((res) => {
      const { attachments } = res.data;

      if (attachments.closingReportFile.length) {
        this.closeFileArray = attachments.closingReportFile;
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

      this.closeFileToUpload = files[0];
    }
  }

  formSubmit(type: string) {
    // Check the form validation is complete
    if (this.FormGroupData.invalid) {
      this.FormGroupData.markAllAsTouched();
      return;
    }

    const { notes } = this.FormGroupData.controls;

    if (!this.closeFileToUpload && this.closeFileArray.length === 0) {
      this.toastr.error('File is required', 'Error');

      return;
    }

    const form = new FormData();

    if (this.closeFileToUpload) {
      form.append('close', this.closeFileToUpload);
    }
    form.append('isApproved', String(type === 'SUBMIT' ? false : true));
    form.append('notes', notes.value);

    // Take the Project ID form the query params
    const { id } = this.route.snapshot.queryParams;

    // Send the APi for change the Status or submit
    this._ProjectService.approveStatusClose(form, id).subscribe({
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
