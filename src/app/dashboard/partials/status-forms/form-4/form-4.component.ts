import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../../project/service/project.service';

@Component({
  selector: 'app-form-4',
  templateUrl: './form-4.component.html',
  styleUrl: './form-4.component.css',
})
export class Form4Component implements OnInit, OnChanges {
  @Input() isRefreshDataInput!: number;
  @Input() isApproveBtnShow!: boolean;

  FormGroupData!: FormGroup;
  TransactionAddedData: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private _ProjectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.FormGroupData = this.formBuilder.group({
      transactionId: ['', Validators.required],
      amount: ['', Validators.required],
      paymentType: ['', Validators.required],
    });

    // Take the Project Data
    const { id } = this.route.snapshot.queryParams;
    this._ProjectService.getProjectById(id).subscribe((res) => {
      const { transactionDetails } = res.data;

      if (transactionDetails) {
        this.TransactionAddedData = transactionDetails;
      }
    });
  }

  ngOnChanges(changes: any): void {
    if (changes.isRefreshDataInput) {
      this.ngOnInit();
    }
  }

  formSubmit(type: string) {
    // Check the form validation is complete
    if (this.FormGroupData.invalid) {
      this.FormGroupData.markAllAsTouched();
      return;
    }

    const { transactionId, amount, paymentType, notes } =
      this.FormGroupData.controls;

    const object = {
      transactionId: transactionId.value,
      amount: amount.value,
      paymentType: paymentType.value,
      isApproved: type === 'SUBMIT' ? false : true,
    };

    // Take the Project ID form the query params
    const { id } = this.route.snapshot.queryParams;

    // Send the APi for change the Status or submit
    this._ProjectService.approveStatusConformation(object, id).subscribe({
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
