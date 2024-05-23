import { Component, OnInit } from '@angular/core';
import { ProjectServiceService } from '../service/project-service.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent implements OnInit {
  orderData: any;
  payedSubtotal: any;
  constructor(private projectService: ProjectServiceService, private toastr: ToastrService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.loadOrderDetails(id);
    });

  }

  loadOrderDetails(id: any) {
    this.projectService.getProjectDetails(id).subscribe({
      next: (data: any) => {
        this.orderData = data.data;
        console.log(this.orderData);

      }, error: (err: any) => {
        this.toastr.error("Error occured when loading project data pls reload page", "Error")
      }
    })
  }

  calculatePayedSubtotal() {
    this.payedSubtotal = this.orderData.transactionDetails.reduce((acc: number, payed: any) => acc + payed.amount, 0);
    return this.payedSubtotal;
  }
}
