import { Component, OnInit } from '@angular/core';

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
      isLastStatus: true,
      completed: 0,
    },
    {
      status: 2,
      statusName: 'Cutting',
      isStarted: false,
      isLastStatus: false,
      completed: 0,
    },
    {
      status: 3,
      statusName: 'Edgebanding',
      isStarted: false,
      isLastStatus: false,
      completed: 0,
    },
    {
      status: 4,
      statusName: 'Boring',
      isStarted: false,
      isLastStatus: false,
      completed: 0,
    },
    {
      status: 5,
      statusName: 'Checking',
      isStarted: false,
      isLastStatus: false,
      completed: 0,
    },
    {
      status: 6,
      statusName: 'Packing',
      isStarted: false,
      isLastStatus: false,
      completed: 0,
    },
  ];

  savedProductionStatus: any = [];

  constructor() {}

  ngOnInit(): void {
    this.savedProductionStatus = this.savedProductionStatus;
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
      this.productionStatus[status].isLastStatus = false;
    }
  }
}
