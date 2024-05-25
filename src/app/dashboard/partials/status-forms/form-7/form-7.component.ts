import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../../../helpers/service/project.service';

@Component({
  selector: 'app-form-7',
  templateUrl: './form-7.component.html',
  styleUrl: './form-7.component.css',
})
export class Form7Component implements OnInit {
  FormGroupData!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private _ProjectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.FormGroupData = this.formBuilder.group({
      deliveryVehicleNumber: [
        '',
        [Validators.required, Validators.minLength(4)],
      ],
      driverNumber: ['', [Validators.required, Validators.minLength(4)]],
    });

    // Take the Project Data
    const { id } = this.route.snapshot.queryParams;
    this._ProjectService.getProjectById(id).subscribe((res) => {
      const { delivery } = res.data;

      if (delivery) {
        this.FormGroupData.patchValue({
          deliveryVehicleNumber: delivery.vehicleNumber,
          driverNumber: delivery.driverNumber,
        });
      }
    });
  }

  formSubmit(type: string) {
    // Check the form validation is complete
    if (this.FormGroupData.invalid) {
      this.FormGroupData.markAllAsTouched();
      return;
    }

    const { driverNumber, deliveryVehicleNumber } = this.FormGroupData.controls;

    const object = {
      isApproved: type === 'SUBMIT' ? false : true,
      driverNumber: driverNumber.value,
      vehicleNumber: deliveryVehicleNumber.value,
    };

    // Take the Project ID form the query params
    const { id } = this.route.snapshot.queryParams;

    // Send the APi for change the Status or submit
    this._ProjectService.approveStatusDelivery(object, id).subscribe({
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
