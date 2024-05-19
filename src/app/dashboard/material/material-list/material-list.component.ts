import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrl: './material-list.component.css',
})
export class MaterialListComponent {
  @ViewChild('MaterialModal') defaultModal!: ElementRef;

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

  FormGroupData!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.closeModal();

    this.FormGroupData = this.formBuilder.group({
      materialName: ['', Validators.required],
      materialUnit: ['', Validators.required],
      materialPhone: ['', Validators.required],
    });
  }

  // Close the modal section
  closeModal() {
    const modal = this.defaultModal?.nativeElement as HTMLElement;
    const modalOverlay = document.getElementById('modal-backdrop');

    // Navigate to the same route with the query parameter
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { id: null },
      queryParamsHandling: 'merge',
    });

    if (modal && modalOverlay) {
      //modal toggle settings
      modal.classList.toggle('hidden');
      modal.classList.toggle('flex');
      modalOverlay.classList.toggle('hidden');
    }
  }

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

  createMaterialModal() {
    const modal = this.defaultModal.nativeElement as HTMLElement;
    const modalOverlay = document.getElementById('modal-backdrop');

    if (modal && modalOverlay) {
      //modal toggle settings
      modal.classList.toggle('hidden');
      modal.classList.toggle('flex');
      modalOverlay.classList.toggle('hidden');
    }
  }

  // Check the Create Material form validation is complete
  createMaterialformSubmit() {
    if (this.FormGroupData.invalid) {
      this.FormGroupData.markAllAsTouched();
      return;
    }
  }
}
