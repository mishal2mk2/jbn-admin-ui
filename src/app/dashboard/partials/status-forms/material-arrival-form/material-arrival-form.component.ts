import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../../project/service/project.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../../helpers/service/common.service';
import { DashboardService } from '../../../dashboard.service';

@Component({
  selector: 'app-material-arrival-form',
  templateUrl: './material-arrival-form.component.html',
  styleUrl: './material-arrival-form.component.css',
})
export class MaterialArrivalFormComponent implements OnInit, OnChanges {
  @Input() isRefreshDataInput!: number;
  @Input() isApproveBtnShow!: boolean;

  FormGroupData!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private _ProjectService: ProjectService,
    private _CommonService: CommonService,
    private _DashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.FormGroupData = this.formBuilder.group({
      priority: ['', Validators.required],
      estimateDateOfArrival: ['', Validators.required],
      isArrived: [''],
    });

    // Take the Project Data
    const { id } = this.route.snapshot.queryParams;
    this._ProjectService.getProjectById(id).subscribe((res) => {
      const { data } = res;

      this.FormGroupData.patchValue({
        priority: data.priority,
        estimateDateOfArrival: this._CommonService.formatDateToYYYY(
          data.estDateOfArrival
        ),
        isArrived: data.isArrived,
      });
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

    this._DashboardService.isLoading(true);

    const { priority, isArrived, estimateDateOfArrival } =
      this.FormGroupData.controls;

    const object = {
      isApproved: type === 'SUBMIT' ? false : true, // Change the value for approve and submit Logic,
      isArrived: isArrived.value,
      priority: priority.value,
      estDateOfArrival: estimateDateOfArrival.value,
    };

    // Take the Project ID form the query params
    const { id } = this.route.snapshot.queryParams;

    // Send the APi for change the Status or submit
    this._ProjectService.approveStatusArraival(object, id).subscribe({
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
}
