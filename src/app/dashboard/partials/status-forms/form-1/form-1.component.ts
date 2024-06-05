import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../../project/service/project.service';

@Component({
  selector: 'app-form-1',
  templateUrl: './form-1.component.html',
  styleUrl: './form-1.component.css',
})
export class Form1Component implements OnInit {
  @Input() isRefreshDataInput!: number;
  @Input() isApproveBtnShow!: boolean;

  FormGroupData!: FormGroup;

  furnitureList = [
    { text: '' },
    { text: '' },
    { text: '' },
  ];
  projectId!:string;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private route:ActivatedRoute,
    private _ProjectService: ProjectService
  ) { }

  ngOnInit(): void {


    this.projectId = this.route.snapshot.queryParams['id'];
    this._ProjectService.getProjectById(this.projectId).subscribe({
      next:(res)=>{
        const {client,projectTotal,notes,furnitureList} = res.data
        this.FormGroupData = this.formBuilder.group({
          clientName: [client?.name ? client?.name : '', [Validators.required, Validators.minLength(4)]],
          clientPhone: [client?.mob ? client?.mob : '', [Validators.required, Validators.minLength(10)]],
          clientEmail: [client?.email ? client?.email : '', [Validators.required, Validators.email]],
          addressCity: [client?.add?.city ? client?.add?.city : '', [Validators.required]],
          addressLocation: [client?.add?.location ? client?.add?.location : '', Validators.required],
          addressLocationLink: [client?.add?.link ? client?.add?.link : '', Validators.required],
          notes: [notes ? notes : ''],
          priceTotal: [projectTotal ? projectTotal : ''],
        });
        this.furnitureList= furnitureList;
      },error:(err)=>{
        this.toastr.error("Error while getting project data","Error");
      }
    })
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
      this.toastr.error("Pls fill list properly", "Error");
    }
  }

  formSubmit(key:string) {
    // Check the form validation is complete
    if (this.FormGroupData.invalid) {
      this.FormGroupData.markAllAsTouched();
      return;
    }

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
    })

    if (this.furnitureList.length > 0) {
      object.furnitureList = this.furnitureList;
    }

    if(key==='APPROVE'){
      object.isApproved=true;
    }else{
      object.isApproved=false;
    }

    this._ProjectService.updateProject(this.projectId, object).subscribe({
      next: (res) => {
        this.router.navigate(['project']).then(() => {
          this.toastr.success('Successfully updated project', 'Success');
          this._ProjectService.$ProjectNavigateDataTransfer.emit();
        });
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error');
      },
    });
  }

}
