import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
  viewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../../project/service/project.service';
import { formatDate } from '@angular/common';
import { DashboardService } from '../../../dashboard.service';
import { CommonService } from '../../../../helpers/service/common.service';

@Component({
  selector: 'app-payment-enter-form',
  templateUrl: './payment-enter-form.component.html',
  styleUrl: './payment-enter-form.component.css',
})
export class PaymentEnterFormComponent implements OnInit, OnChanges {
  @ViewChild('TransactionModal') childModal!: ElementRef;
  @Input() isRefreshDataInput!: number;
  @Input() isApproveBtnShow!: boolean;
  @Input() key!: number | undefined;

  FormGroupData!: FormGroup;
  FormGroupDataUpdate!: FormGroup;
  TransactionAddedData: any[] = [];
  updateTrancData: any;
  isHaveRoleAccessToEditPayment = false;

  constructor(
    private formBuilder: FormBuilder,
    private formBuilderUpdate: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private _ProjectService: ProjectService,
    private _CommonService: CommonService,
    private _DashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.FormGroupData = this.formBuilder.group({
      transactionId: ['', Validators.required],
      amount: ['', Validators.required],
      paymentType: ['', Validators.required],
    });

    this.FormGroupDataUpdate = this.formBuilderUpdate.group({
      date: ['', Validators.required],
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

    // Check the Role Access
    const userData = this._CommonService.getAllUserData();
    if (userData) {
      const { role } = userData;

      this.isHaveRoleAccessToEditPayment = 'MD' === role;
    }
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

    this._DashboardService.isLoading(true);

    const { transactionId, amount, paymentType, notes } =
      this.FormGroupData.controls;

    const object = {
      transactionId: transactionId.value,
      amount: amount.value,
      paymentType: paymentType.value,
      isApproved: type === 'SUBMIT' ? false : true,
      key: this.key,
    };

    // Take the Project ID form the query params
    const { id } = this.route.snapshot.queryParams;

    // Send the APi for change the Status or submit
    this._ProjectService.approveStatusConformation(object, id).subscribe({
      next: () => {
        this._DashboardService.isLoading(false, false);

        this.toastr.success('Successfully update project status', 'Success');
        this._ProjectService.$ProjectNavigateDataTransfer.emit();
      },
      error: (err) => {
        this._DashboardService.isLoading(false, false);

        this.toastr.error(err.error.message, 'Error');
      },
    });
  }

  updateTransaction() {
    if (this.FormGroupDataUpdate.invalid) {
      this.FormGroupDataUpdate.markAllAsTouched();
      return;
    }

    const { id } = this.route.snapshot.queryParams;

    const updatedData = Object.assign(
      this.updateTrancData,
      this.FormGroupDataUpdate.value
    );
    let dateObject = new Date(updatedData.date);

    updatedData.date = dateObject;
    console.log(updatedData);
    this._ProjectService.editTransaction(updatedData, id).subscribe({
      next: (res: any) => {
        this._ProjectService.getProjectById(id).subscribe((res) => {
          const { transactionDetails } = res.data;

          if (transactionDetails) {
            this.TransactionAddedData = transactionDetails;
          }
        });
        this.toastr.success(
          'Succesfully changed Transaction Details',
          'Success'
        );
      },
      error: (err: any) => {
        this.toastr.error(
          'Some error occured while editing transaction',
          'Error'
        );
      },
    });
    this.closeUpdateTransactionModal();
    this.updateTrancData = {};
    this.FormGroupDataUpdate = this.formBuilderUpdate.group({
      date: ['', Validators.required],
      transactionId: ['', Validators.required],
      amount: ['', Validators.required],
      paymentType: ['', Validators.required],
    });
    //update api call with updatedData
  }
  updateModal(data: any) {
    const modal = this.childModal.nativeElement as HTMLElement;

    if (modal) {
      //modal toggle settings
      modal.classList.toggle('hidden');
      modal.classList.toggle('flex');
    }

    this.updateTrancData = data;
    this.FormGroupDataUpdate = this.formBuilderUpdate.group({
      date: [formatDate(data.date, 'yyyy-MM-dd', 'en'), Validators.required],
      transactionId: [data.transactionId, Validators.required],
      amount: [data.amount, Validators.required],
      paymentType: [data.paymentType, Validators.required],
    });
    this.FormGroupDataUpdate.valueChanges;
  }
  closeUpdateTransactionModal() {
    const modal = this.childModal?.nativeElement as HTMLElement;

    if (modal) {
      //modal toggle settings
      modal.classList.toggle('hidden');
      modal.classList.toggle('flex');
    }
  }
}
