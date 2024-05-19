import { Component } from '@angular/core';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrl: './material-list.component.css',
})
export class MaterialListComponent {
  // Pagination variables
  currentPage = 1;
  itemsPerPage = 20;
  searchTerm = ''; // Variable to store the search term

  materials = [
    {
      price: 280,
      unit: 'inch',
      id: 'dfsdfs',
      name: 'Nail',
    },
    {
      price: 500,
      unit: 'feet',
      id: 'dfsdsabdvfs',
      name: 'Strip',
    },
    {
      price: 90,
      unit: 'sq',
      id: 'dfsddsagads',
      name: 'Plywood',
    },
    {
      price: 190,
      unit: 'mg',
      id: 'dfsdsafds',
      name: 'Color powder',
    },
  ];

  ngOnInit(): void {}

  // Function to get the current page of materials
  getCurrentPageMaterials() {
    const filteredMaterials = this.materials.filter(
      (material) =>
        material.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        material.unit.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        material.price
          .toString()
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
    );

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return filteredMaterials.slice(startIndex, endIndex);
  }
}
