import { Component } from '@angular/core';

@Component({
  selector: 'app-material-edit',
  templateUrl: './material-edit.component.html',
  styleUrl: './material-edit.component.css'
})
export class MaterialEditComponent {
  items: any[] = [
    { name: 'Apple MacBook Pro 17"', unit: 'Silver', quantity: 3, price: 2999 },
    { name: 'Microsoft Surface Pro', unit: 'White', quantity: 4, price: 1999 },
    { name: 'Magic Mouse 2', unit: 'Black', quantity: 5, price: 99 }
  ];

  newItem: any = {
    name: '',
    unit: '',
    quantity: '',
    price: ''
  };

  addItem() {
    this.items.push(this.newItem);
    this.newItem = { name: '', unit: '', quantity: '', price: '' };
  }

  editItem(index: number) {
    // Handle editing logic here
  }

  deleteItem(index: number) {
    this.items.splice(index, 1);
  }

  calculateSubTotal(): number {
    return this.items.reduce((total, item) => total + (item.price*item.quantity), 0);
  }
}
