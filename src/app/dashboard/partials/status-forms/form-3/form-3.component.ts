import { ToastrService } from 'ngx-toastr';
import { MaterialService } from './../../../../helpers/service/material.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../../helpers/service/project.service';

@Component({
  selector: 'app-form-3',
  templateUrl: './form-3.component.html',
  styleUrl: './form-3.component.css',
})
export class Form3Component implements OnInit {
  FormGroupData!: FormGroup;
  materials: any = [];

  materialsAdded = [
    {
      itemId: '',
      itemUnit: '',
      itemName: '',
      itemQuantity: 1,
      itemPrice: 0,
    },
  ];

  isTableInvalid = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private _ProjectService: ProjectService,
    private _MaterialService: MaterialService
  ) {}

  ngOnInit(): void {
    this.FormGroupData = this.formBuilder.group({
      estimatedDaysOfCompletion: ['', Validators.required],
      notes: [''],
    });

    // Get all Material Data API Call
    this._MaterialService.getAllMaterialData().subscribe((res) => {
      this.materials = res.data;
    });

    // Take the Project Data
    const { id } = this.route.snapshot.queryParams;
    this._ProjectService.getProjectById(id).subscribe((res) => {
      if (res.data.material_details) {
        this.FormGroupData.patchValue({
          estimatedDaysOfCompletion:
            res.data.material_details.estimatedDaysOfCompletion,
        });

        const savedMaterial: any[] = [];

        res.data.material_details.item.forEach((el: any) => {
          savedMaterial.push({
            itemId: el.item_id._id,
            itemUnit: el.item_id.unitCalculated,
            itemName: el.item_id.name,
            itemQuantity: el.quantity,
            itemPrice: el.item_id.price,
          });
        });

        this.materialsAdded = savedMaterial;
      }
    });
  }

  // Get the total values
  get getGrossTotalValue() {
    let result = 0;

    this.materialsAdded.forEach((el) => {
      const subTotal = el.itemPrice * el.itemQuantity;

      result += subTotal;
    });

    return result;
  }

  // Select the material and add the datas
  selectTheMaterials(event: any, index: number) {
    const { value } = event.target;

    const currentMaterial = this.materials.find((e: any) => e._id === value);

    // Change the datas in the selected Materials
    if (currentMaterial && value) {
      this.materialsAdded[index].itemId = currentMaterial._id;
      this.materialsAdded[index].itemPrice = currentMaterial.price;
      this.materialsAdded[index].itemQuantity = 1;
      this.materialsAdded[index].itemName = currentMaterial.name;
      this.materialsAdded[index].itemUnit = currentMaterial.unitCalculated;
    }
  }

  // Check the Values are fully Valid
  validateTheSelectedMaterial() {
    let isValid = true;

    this.materialsAdded.forEach((el) => {
      if (!el.itemId || el.itemQuantity < 1) {
        isValid = false;
      }
    });

    return isValid;
  }

  // Add the Materials to the selected array
  addMaterialSection() {
    if (this.validateTheSelectedMaterial()) {
      this.materialsAdded.push({
        itemId: '',
        itemUnit: '',
        itemName: '',
        itemQuantity: 1,
        itemPrice: 0,
      });
    } else {
      this.isTableInvalid = true;

      setTimeout(() => {
        this.isTableInvalid = false;
      }, 3000);
    }
  }

  // Remove the data from the Selected array
  removeMaterial(index: number) {
    if (this.materialsAdded.length > 1) {
      this.materialsAdded.splice(index, 1);
    }
  }

  formSubmit(type: string) {
    // Check the validation
    let isValid = true;

    this.materialsAdded.forEach((el) => {
      if (
        !el.itemId ||
        el.itemPrice <= 0 ||
        el.itemQuantity < 1 ||
        !el.itemUnit
      ) {
        isValid = false;
      }
    });

    if (!isValid) {
      this.toastr.error('Fill Material section', 'Error');
      return;
    }

    // Check the form validation is complete
    if (this.FormGroupData.invalid) {
      this.FormGroupData.markAllAsTouched();
      return;
    }

    const { estimatedDaysOfCompletion, notes } = this.FormGroupData.controls;

    // set the Object data
    const object: any = {
      item: [],
      grossTotal: this.getGrossTotalValue,
      isApproved: type === 'SUBMIT' ? false : true, // Change the value for approve and submit Logic,
      estimatedDaysOfCompletion: Number(estimatedDaysOfCompletion.value),
      notes: notes.value,
    };

    this.materialsAdded.forEach((el) => {
      object.item.push({
        item_id: el.itemId,
        price: el.itemPrice,
        unitCalculated: el.itemUnit,
        name: el.itemName,
        quantity: el.itemQuantity,
        subTotal: Number(el.itemPrice) * Number(el.itemQuantity),
      });
    });

    // Take the Project ID form the query params
    const { id } = this.route.snapshot.queryParams;

    // Send the APi for change the Status or submit
    this._ProjectService.approveStatusMaterialEstimate(object, id).subscribe({
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
