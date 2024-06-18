import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { OrderStatus } from '../helpers/interface/project_status.modal';

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
    this._DashboardService.isLoading(true);
    this._DashboardService.statusCountDashboardAPI().subscribe((res) => {
      this._DashboardService.isLoading(false);
      const { data } = res;

      if (data) {
        data.forEach((el: any) => {
          if (el.orderStatus === OrderStatus.ORDER_ENTERING) {
            this.statusCountObject.orderEntering = el.count;
          } else if (el.orderStatus === OrderStatus.WAITING_CONFIRMATION) {
            this.statusCountObject.waitingConfirmation = el.count;
          } else if (el.orderStatus === OrderStatus.DRAWING) {
            this.statusCountObject.drawing = el.count;
          } else if (el.orderStatus === OrderStatus.MATERIAL_ESTIMATE) {
            this.statusCountObject.materialEstimate = el.count;
          } else if (el.orderStatus === OrderStatus.MATERIAL_ARRIVAL) {
            this.statusCountObject.materialArrival = el.count;
          } else if (el.orderStatus === OrderStatus.PRODUCTION) {
            this.statusCountObject.production = el.count;
          } else if (el.orderStatus === OrderStatus.CLOSE_PAYMENT) {
            this.statusCountObject.paymentClose = el.count;
          } else if (el.orderStatus === OrderStatus.DELIVERY) {
            this.statusCountObject.delivery = el.count;
          } else if (el.orderStatus === OrderStatus.INSTALLATION) {
            this.statusCountObject.installation = el.count;
          } else if (el.orderStatus === OrderStatus.AWAITING_SERVICE) {
            this.statusCountObject.awaitingService = el.count;
          } else if (el.orderStatus === OrderStatus.SERVICE) {
            this.statusCountObject.service = el.count;
          } else if (el.orderStatus === OrderStatus.TO_CLOSE) {
            this.statusCountObject.toClose = el.count;
          } else if (el.orderStatus === OrderStatus.CLOSED) {
            this.statusCountObject.closed = el.count;
          } else if (el.orderStatus === OrderStatus.CANCELLED) {
            this.statusCountObject.cancelled = el.count;
          }
        });
      }
    });
  }
}
