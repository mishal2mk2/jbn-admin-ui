import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidationService } from '../../../../helpers/service/form-validation.service';
import { ProjectService } from '../../../project/service/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { upload_file_size } from '../../../../helpers/constant/upload-file-size';
import { DashboardService } from '../../../dashboard.service';

@Component({
  selector: 'app-drawing-entering-form',
  templateUrl: './drawing-entering-form.component.html',
  styleUrl: './drawing-entering-form.component.css',
})
export class DrawingEnteringFormComponent implements OnInit, OnChanges {
  @Input() isRefreshDataInput!: number;
  @Input() isApproveBtnShow!: boolean;

  FormGroupData!: FormGroup;
  drawingFileToUpload: File | null = null;
  drawingFileArray: any[] = [];
  uploadFileSize: string = `${upload_file_size} MB`;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private _FormValidationService: FormValidationService,
    private _ProjectService: ProjectService,
    private _DashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.FormGroupData = this.formBuilder.group({
      file: [''],
      notes: [''],
    });

    // Take the Project Data
    const { id } = this.route.snapshot.queryParams;
    this._ProjectService.getProjectById(id).subscribe((res) => {
      const { attachments } = res.data;

      if (attachments.drawingFile.length) {
        this.drawingFileArray = attachments.drawingFile;
      }
    });
  }

  ngOnChanges(changes: any): void {
    if (changes.isRefreshDataInput) {
      this.ngOnInit();
    }
  }

  // Validate File size on Add file
  validateFileSize(event: Event) {
    // Check the File size more the 5mb and if true
    const { files } = event.target as HTMLInputElement;

    if (files) {
      // Check the is File
      if (!this._FormValidationService.isValidImagePdfFileType(files)) {
        this.FormGroupData.patchValue({
          file: '',
        });

        this.FormGroupData.controls['file'].setErrors({
          invalidFile: true,
        });

        return;
      }

      // Check the File size
      const maxSize = upload_file_size * 1024 * 1024; // 5MB in bytes
      const selectFile = files[0];

      if (selectFile?.size > maxSize) {
        this.FormGroupData.patchValue({
          file: '',
        });

        this.FormGroupData.controls['file'].setErrors({
          maxSize: true,
        });
        return;
      }

      this.drawingFileToUpload = files[0];
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

    if (!this.drawingFileToUpload && this.drawingFileArray.length === 0) {
      this.toastr.error('File is required', 'Error');

      return;
    }

    this._DashboardService.isLoading(true);

    if (this.drawingFileToUpload) {
      form.append('drawing', this.drawingFileToUpload);
    }

    form.append('isApproved', String(type === 'SUBMIT' ? false : true)); // Change the value for approve and submit Logic
    form.append('notes', notes.value);

    // Take the Project ID form the query params
    const { id } = this.route.snapshot.queryParams;

    // Send the APi for change the Status or submit
    this._ProjectService.approveStatusDrawing(form, id).subscribe({
      next: () => {
        this.FormGroupData.patchValue({
          file: '',
        });
        this.drawingFileToUpload = null;
        this.toastr.success('Successfully update project status', 'Success');
        this._DashboardService.isLoading(false, false);
        this._ProjectService.$ProjectNavigateDataTransfer.emit();
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error');
        this._DashboardService.isLoading(false, false);
      },
    });
  }
}
