import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../../project/service/project.service';

@Component({
  selector: 'app-awaiting-service-form',
  templateUrl: './awaiting-service-form.component.html',
  styleUrl: './awaiting-service-form.component.css',
})
export class AwaitingServiceFormComponent {
  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private _ProjectService: ProjectService
  ) {}

  @Input() isApproveBtnShow!: boolean;

  formSubmit(approve: boolean) {
    const object = { isApproved: approve };

    // Take the Project ID form the query params
    const { id } = this.route.snapshot.queryParams;

    // Send the APi for change the Status or submit
    this._ProjectService.approveStatusAwaitingService(object, id).subscribe({
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
