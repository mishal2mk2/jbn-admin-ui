import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-3',
  templateUrl: './form-3.component.html',
  styleUrl: './form-3.component.css',
})
export class Form3Component implements OnInit {
  materials = [
    {
      id: 'alkdjfalkdq-3r1',
      price: 280,
      unit: 'inch',
      name: 'Nail',
    },
    {
      id: 'alkdgfalkdq-3r1',
      price: 500,
      unit: 'feet',
      name: 'Mica Sheet',
    },
    {
      id: 'alkdjfawkdq-3r1',
      price: 222,
      unit: 'sq',
      name: 'Plywood',
    },
    {
      id: 'alkdefalkdsq-3r1',
      price: 498,
      unit: 'Meter',
      name: 'Scating',
    },
  ];

  materialsAdded = [
    {
      itemId: '',
      itemUnit: '',
      itemQuantity: 1,
      itemPrice: 0,
    },
  ];

  isTableInvalid = false;

  constructor() {}

  ngOnInit(): void {}

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

    const currentMaterial = this.materials.find((e) => e.id === value);

    // Change the datas in the selected Materials
    if (currentMaterial && value) {
      this.materialsAdded[index].itemId = currentMaterial.id;
      this.materialsAdded[index].itemPrice = currentMaterial.price;
      this.materialsAdded[index].itemQuantity = 1;
      this.materialsAdded[index].itemUnit = currentMaterial.unit;
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

  formSubmit() {}
}
