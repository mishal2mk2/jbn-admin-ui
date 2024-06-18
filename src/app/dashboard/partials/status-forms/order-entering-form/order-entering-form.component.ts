import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../../project/service/project.service';
import { DashboardService } from '../../../dashboard.service';

@Component({
  selector: 'app-order-entering-form',
  templateUrl: './order-entering-form.component.html',
  styleUrl: './order-entering-form.component.css',
})
export class OrderEnteringFormComponent implements OnInit {
  @Input() isRefreshDataInput!: number;
  @Input() isApproveBtnShow!: boolean;

  FormGroupData!: FormGroup;

  furnitureList = [{ text: '' }, { text: '' }, { text: '' }];
  projectId!: string;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private _ProjectService: ProjectService,
    private _DashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.queryParams['id'];

    this.FormGroupData = this.formBuilder.group({
      clientName: ['', [Validators.required, Validators.minLength(4)]],
      clientPhone: ['', [Validators.required, Validators.minLength(10)]],
      clientEmail: ['', [Validators.required, Validators.email]],
      addressCity: ['', [Validators.required]],
      addressLocation: ['', Validators.required],
      addressLocationLink: ['', Validators.required],
      notes: [''],
      priceTotal: [''],
    });

    this._ProjectService.getProjectById(this.projectId).subscribe({
      next: (res) => {
        const { client, projectTotal, notes, furnitureList } = res.data;
        this.FormGroupData.patchValue({
          clientName: client?.name ? client?.name : '',
          clientPhone: client?.mob ? client?.mob : '',
          clientEmail: client?.email ? client?.email : '',
          addressCity: client?.add?.city ? client?.add?.city : '',
          addressLocation: client?.add?.location ? client?.add?.location : '',
          addressLocationLink: client?.add?.link ? client?.add?.link : '',
          notes: notes ? notes : '',
          priceTotal: projectTotal ? projectTotal : '',
        });

        this.furnitureList = furnitureList;
      },
      error: (err) => {
        this.toastr.error('Error while getting project data', 'Error');
      },
    });
  }

  ngOnChanges(changes: any): void {
    if (changes.isRefreshDataInput) {
      this.ngOnInit();
    }
  }

  validateList() {
    let isValid = true;

    this.furnitureList.forEach((el) => {
      if (el.text.trim().length === 0) {
        isValid = false;
      }
    });

    return isValid;
  }

  addFurnitureList() {
    if (this.validateList()) {
      this.furnitureList.push({ text: '' });
    } else {
      this.toastr.error('Pls fill list properly', 'Error');
    }
  }

  formSubmit(key: string) {
    // Check the form validation is complete
    if (this.FormGroupData.invalid) {
      this.FormGroupData.markAllAsTouched();
      return;
    }

    this._DashboardService.isLoading(true);

    const {
      clientName,
      clientPhone,
      clientEmail,
      addressCity,
      addressLocation,
      addressLocationLink,
      notes,
      priceTotal,
    } = this.FormGroupData.controls;

    const object: any = {
      client: {
        name: clientName.value,
        mob: clientPhone.value,
        email: clientEmail.value,
        add: {
          city: addressCity.value,
          location: addressLocation.value,
          link: addressLocationLink.value,
        },
      },
      notes: notes.value,
      projectTotal: priceTotal.value,
    };

    this.furnitureList = this.furnitureList.filter((list) => {
      if (list.text.trim().length === 0) {
        return false;
      }
      return true;
    });

    if (this.furnitureList.length > 0) {
      object.furnitureList = this.furnitureList;
    }

    if (key === 'APPROVE') {
      object.isApproved = true;
    } else {
      object.isApproved = false;
    }

    this._ProjectService.updateProject(this.projectId, object).subscribe({
      next: (res) => {
        this._DashboardService.isLoading(false, false);

        this.router.navigate(['project']).then(() => {
          this.toastr.success('Successfully updated project', 'Success');
          this._ProjectService.$ProjectNavigateDataTransfer.emit();
        });
      },
      error: (err) => {
        this._DashboardService.isLoading(false, false);
        this.toastr.error(err.error.message, 'Error');
      },
    });
  }
}
