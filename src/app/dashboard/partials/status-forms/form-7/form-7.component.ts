import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../../project/service/project.service';
import { FormValidationService } from '../../../../helpers/service/form-validation.service';

@Component({
  selector: 'app-form-7',
  templateUrl: './form-7.component.html',
  styleUrl: './form-7.component.css',
})
export class Form7Component implements OnInit, OnChanges {
  @Input() isRefreshDataInput!: number;
  @Input() isApproveBtnShow!: boolean;

  FormGroupData!: FormGroup;
  deliveryFileToUpload: File | null = null;
  deliveryFileArray: any[] = [];
  locationLink: any;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private _FormValidationService: FormValidationService,
    private _ProjectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.FormGroupData = this.formBuilder.group({
      file: [''],
      isDelivered: [false, [Validators.required]],
      deliveryVehicleNumber: [
        '',
        [Validators.required, Validators.minLength(4)],
      ],
      driverNumber: ['', [Validators.required, Validators.minLength(4)]],
    });

    // Take the Project Data
    const { id } = this.route.snapshot.queryParams;
    this._ProjectService.getProjectById(id).subscribe((res) => {
      const { delivery, attachments,client } = res.data;
      this.locationLink = client?.add?.link
      if (delivery) {
        this.FormGroupData.patchValue({
          deliveryVehicleNumber: delivery.vehicleNumber,
          driverNumber: delivery.driverNumber,
        });

        this.deliveryFileArray = attachments.invoiceFile;
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
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
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

      this.deliveryFileToUpload = files[0];
    }
  }

  formSubmit(type: string) {
    // Check the form validation is complete
    if (this.FormGroupData.invalid) {
      this.FormGroupData.markAllAsTouched();
      return;
    }

    // Take the Project ID form the query params
    const { id } = this.route.snapshot.queryParams;

    const { driverNumber, deliveryVehicleNumber, isDelivered } =
      this.FormGroupData.controls;

    const object = {
      isApproved: type === 'SUBMIT' ? false : true,
      driverNumber: driverNumber.value,
      vehicleNumber: deliveryVehicleNumber.value,
      isDelivered: this.isApproveBtnShow ? true : isDelivered.value,
      furnitureList: [],
    };

    if (!this.deliveryFileToUpload && this.deliveryFileArray.length === 0) {
      this.toastr.error('File is required', 'Error');

      return;
    }

    const formObjectFile = new FormData();

    if (this.deliveryFileToUpload) {
      formObjectFile.append('file', this.deliveryFileToUpload);
      formObjectFile.append('key', 'invoice');

      this._ProjectService.projectFileUpload(formObjectFile, id).subscribe({
        next: (res) => {},
        error: (err) => {
          this.toastr.error(err.error.message, 'Error');
        },
      });
    }

    // Send the APi for change the Status or submit
    this._ProjectService.approveStatusDelivery(object, id).subscribe({
      next: () => {
        this.toastr.success('Successfully update project status', 'Success');
        this.FormGroupData.patchValue({
          file: '',
        });
        this.deliveryFileToUpload= null;
        this._ProjectService.$ProjectNavigateDataTransfer.emit();
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error');
      },
    });
  }
}
