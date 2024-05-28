import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../service/project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css',
})
export class ProjectDetailsComponent implements OnInit {
  orderData: any;
  payedSubtotal: any;
  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private _ProjectService: ProjectService
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.loadOrderDetails(id);
    });
  }

  loadOrderDetails(id: any) {
    this._ProjectService.getProjectById(id).subscribe({
      next: (data: any) => {
        this.orderData = data.data;
      },
      error: (err: any) => {
        this.toastr.error(
          'Error occured when loading project data pls reload page',
          'Error'
        );
      },
    });
  }

  calculatePayedSubtotal() {
    this.payedSubtotal = this.orderData.transactionDetails.reduce(
      (acc: number, payed: any) => acc + payed.amount,
      0
    );
    return this.payedSubtotal;
  }
}
