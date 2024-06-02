import { Component,Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormValidationService } from '../../../../helpers/service/form-validation.service';
import { ProjectService } from '../../../project/service/project.service';

@Component({
  selector: 'app-form-1',
  templateUrl: './form-1.component.html',
  styleUrl: './form-1.component.css'
})
export class Form1Component implements OnInit {
  @Input() isRefreshDataInput!: number;

  FormGroupData!:FormGroup;
  
  constructor(
    private formBuilder:FormBuilder,
    private toastr:ToastrService,
    private route:ActivatedRoute,
    private _FormValidationService:FormValidationService,
    private _ProjectService:ProjectService,
  ){}

  ngOnInit(): void {
    this.FormGroupData= this.formBuilder.group({
      
    })
  }
}
