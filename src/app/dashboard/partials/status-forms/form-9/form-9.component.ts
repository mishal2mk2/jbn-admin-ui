import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../../../helpers/service/project.service';

@Component({
  selector: 'app-form-9',
  templateUrl: './form-9.component.html',
  styleUrl: './form-9.component.css',
})
export class Form9Component {
  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private _ProjectService: ProjectService
  ) {}

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
