import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ProjectService } from '../../../project/service/project.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-6',
  templateUrl: './form-6.component.html',
  styleUrl: './form-6.component.css',
})
export class Form6Component implements OnInit, OnChanges {
  @Input() isRefreshDataInput!: number;
  @Input() isApproveBtnShow!: boolean;

  FormGroupData!: FormGroup;
  productionStatus = [
    {
      status: 1,
      statusName: 'Pressing',
      isStarted: true,
      completed: 0,
    },
    {
      status: 2,
      statusName: 'Cutting',
      isStarted: false,
      completed: 0,
    },
    {
      status: 3,
      statusName: 'Edgebanding',
      isStarted: false,
      completed: 0,
    },
    {
      status: 4,
      statusName: 'Boring',
      isStarted: false,
      completed: 0,
    },
    {
      status: 5,
      statusName: 'Checking',
      isStarted: false,
      completed: 0,
    },
    {
      status: 6,
      statusName: 'Packing',
      isStarted: false,
      completed: 0,
    },
  ];

  furnitureData: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private _ProjectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.FormGroupData = this.formBuilder.group({
      inCharge: ['', [Validators.required]],
    });

    // Take the Project Data
    const { id } = this.route.snapshot.queryParams;
    this._ProjectService.getProjectById(id).subscribe((res) => {
      const { production_details, furnitureList } = res.data;

      if (furnitureList.length) {
        this.furnitureData = furnitureList || [];
      }

      if (production_details) {
        for (let i = 1; i <= this.productionStatus.length; i++) {
          this.productionStatus[i - 1].completed =
            production_details.productionStatus[i].percentCompleted;
          this.productionStatus[i - 1].isStarted =
            production_details.productionStatus[i].isStarted;
        }

        this.FormGroupData.patchValue({
          inCharge: production_details.inCharge,
        });
      }
    });
  }

  ngOnChanges(changes: any): void {
    if (changes.isRefreshDataInput) {
      this.ngOnInit();
    }
  }

  // Change the range option and change the starter
  onChangeTheRange(event: any, status: number) {
    const { value } = event.target;
    let isValid = true;

    if (status > 1) {
      for (let i = status-2; i >=0; i--) {
        if (
          !this.productionStatus[i].isStarted ||
          this.productionStatus[i].completed === 0 ||
          this.productionStatus[i].completed < value
        ) {
          if(this.productionStatus[i].completed < value){
            this.productionStatus[status-1].completed=this.productionStatus[i].completed;
            if(this.productionStatus[status-1].completed>0){
              this.productionStatus[status].isStarted = true;
            }
          }
          isValid = false;
          this.toastr.warning("Not a valid range","Warning");
          break;
        }
      }
    }

    // Check Others are Completed
    if (isValid) {
      this.productionStatus[status].isStarted = true;

      if (
        this.productionStatus[status].isStarted &&
        this.productionStatus[status].completed >0
      ) {
        this.productionStatus[status + 1].isStarted = true;
      }
    }

    console.log(this.productionStatus);
  }

  formSubmit(type: string) {
    // Check the form validation is complete
    if (this.FormGroupData.invalid) {
      this.FormGroupData.markAllAsTouched();
      return;
    }

    if (type === 'APPROVE') {
      let isAllStatusComplete = true;

      this.productionStatus.forEach((el) => {
        if (el.completed < 100) {
          isAllStatusComplete = false;
        }
      });

      if (!isAllStatusComplete) {
        this.toastr.error('Fill all production 100%', 'Error');
        return;
      }
    }

    const { inCharge } = this.FormGroupData.controls;
    const object: any = {
      isApproved: type === 'SUBMIT' ? false : true,
      isCompleted: false,
      productionStatus: null,
      inCharge: inCharge.value,
      furnitureList: [],
    };

    // Set Production Status
    const projectStatus: any = {};
    let isAllStatusComplete = true;

    this.productionStatus.forEach((el) => {
      projectStatus[el.status] = {
        percentCompleted: el.completed,
        isStarted: el.isStarted,
      };

      if (el.completed < 100) {
        isAllStatusComplete = false;
      }
    });

    // Set furniture data
    const resultFurniture: any = [];

    this.furnitureData.forEach((el) => {
      resultFurniture.push({ text: el.text, isDelivered: el.isDelivered });
    });

    object.productionStatus = projectStatus;
    object.isCompleted = isAllStatusComplete;
    object.furnitureList = resultFurniture;

    // Take the Project ID form the query params
    const { id } = this.route.snapshot.queryParams;

    // Send the APi for change the Status or submit
    this._ProjectService.approveStatusProduction(object, id).subscribe({
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
