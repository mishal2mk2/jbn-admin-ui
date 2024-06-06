import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  statusCountObject: any = {};

  constructor(private _DashboardService: DashboardService) {}

  //  {
  //     "count": 1,
  //     "orderStatus": 10
  // },

  ngOnInit(): void {
    this._DashboardService.statusCountDashboardAPI().subscribe((res) => {
      const { data } = res;

      if (data) {
        data.forEach((el: any) => {
          if (el.orderStatus === 2) {
            this.statusCountObject.drawing = el.count;
          } else if (el.orderStatus === 3) {
            this.statusCountObject.materialEstimate = el.count;
          } else if (el.orderStatus === 4) {
            this.statusCountObject.waitingConfirmation = el.count;
          } else if (el.orderStatus === 5) {
            this.statusCountObject.materialArrival = el.count;
          } else if (el.orderStatus === 6) {
            this.statusCountObject.production = el.count;
          } else if (el.orderStatus === 7) {
            this.statusCountObject.delivery = el.count;
          } else if (el.orderStatus === 8) {
            this.statusCountObject.installation = el.count;
          } else if (el.orderStatus === 9) {
            this.statusCountObject.awaitingService = el.count;
          } else if (el.orderStatus === 10) {
            this.statusCountObject.service = el.count;
          } else if (el.orderStatus === 11) {
            this.statusCountObject.toClose = el.count;
          } else if (el.orderStatus === 12) {
            this.statusCountObject.closed = el.count;
          } else if (el.orderStatus === 13) {
            this.statusCountObject.cancelled = el.count;
          }
        });

        console.log(this.statusCountObject);
      }
    });
  }
}
