import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../../helpers/service/project.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-6',
  templateUrl: './form-6.component.html',
  styleUrl: './form-6.component.css',
})
export class Form6Component implements OnInit {
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

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private _ProjectService: ProjectService
  ) {}

  ngOnInit(): void {
    // Take the Project Data
    const { id } = this.route.snapshot.queryParams;
    this._ProjectService.getProjectById(id).subscribe((res) => {
      const { production_details } = res.data;

      if (production_details) {
        for (let i = 1; i <= this.productionStatus.length; i++) {
          this.productionStatus[i - 1].completed =
            production_details.productionStatus[i].percentCompleted;
          this.productionStatus[i - 1].isStarted =
            production_details.productionStatus[i].isStarted;
        }
      }
    });
  }

  // Change the range option and change the starter
  onChangeTheRange(event: any, status: number) {
    const { value } = event.target;
    let isValid = true;

    if (status > 1) {
      for (let i = 0; i < status - 1; i++) {
        if (
          !this.productionStatus[i].isStarted ||
          this.productionStatus[i].completed !== 100 ||
          this.productionStatus[i].completed < value
        ) {
          isValid = false;

          break;
        }
      }
    }

    // Check Others are Completed
    if (isValid) {
      this.productionStatus[status].isStarted = true;
    }
  }

  formSubmit(type: string) {
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

    const object: any = {
      isApproved: type === 'SUBMIT' ? false : true,
      isCompleted: false,
      productionStatus: null,
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

    object.productionStatus = projectStatus;
    object.isCompleted = isAllStatusComplete;

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
