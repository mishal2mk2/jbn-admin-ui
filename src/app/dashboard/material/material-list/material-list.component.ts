import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialService } from '../service/material.service';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../../dashboard.service';

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

  materials: {
    name: string;
    _id: string;
    price: number;
    unitCalculated: string;
    code: string;
  }[] = [];

  FormGroupData!: FormGroup;
  isUpdate: boolean = false;
  updateListData: any = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _MaterialService: MaterialService,
    private toastr: ToastrService,
    private _DashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    //load material list
    this._DashboardService.isLoading(true);
    this._MaterialService.getAllMaterialData().subscribe({
      next: (data: any) => {
        this._DashboardService.isLoading(false);
        this.materials = data.data;
      },
      error: (err) => {
        this._DashboardService.isLoading(false);
        this.toastr.error('Error while loading item list', 'Error');
      },
    });
    //close modal
    this.closeModal();

    this.FormGroupData = this.formBuilder.group({
      name: ['', Validators.required],
      unitCalculated: ['', Validators.required],
      price: ['', Validators.required],
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
    const filteredMaterials = this.materials.filter((material) => {
      return (
        material.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        material.unitCalculated
          .toString()
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        material.price
          .toString()
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
      );
    });

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
    this._DashboardService.isLoading(true);
    this._MaterialService.createItem(this.FormGroupData.value).subscribe({
      next: (data: any) => {
        this._DashboardService.isLoading(false);
        //pushing new created item to materials array
        const { name, unitCalculated, code, price, _id } = data.data;
        this.materials.push({ name, unitCalculated, code, price, _id });

        this.toastr.success('Item added succefully', 'Success');
      },
      error: (err: any) => {
        this._DashboardService.isLoading(false);
        if (err.message) {
          this.toastr.error(err.message, 'Error');
        } else {
          this.toastr.error('Some error occured', 'Error');
        }
      },
    });
    this.closeModal();
  }
  deleteItem(id: any) {
    this._DashboardService.isLoading(true);
    this._MaterialService.deleteItem(id).subscribe({
      next: (data: any) => {
        this._DashboardService.isLoading(false);
        //filtering material from existing list
        this.materials = this.materials.filter((mat) => {
          return mat._id !== id;
        });

        this.toastr.success('Item deleted succefully', 'Success');
      },
      error: (err: any) => {
        this._DashboardService.isLoading(false);
        this.toastr.error('Some error occured', 'Error');
      },
    });
  }
  updateItem() {
    if (this.FormGroupData.invalid) {
      this.FormGroupData.markAllAsTouched();
      return;
    }
    const updatedData = Object.assign(
      this.updateListData,
      this.FormGroupData.value
    );
    this._DashboardService.isLoading(true);
    this._MaterialService.updateItem(updatedData).subscribe({
      next: (data: any) => {
        this._DashboardService.isLoading(false);
        const { _id, name, unitCalculated, price, code } = data.data;
        this.materials = this.materials.map((mat) => {
          if (mat._id === _id) {
            mat = { _id, name, unitCalculated, price, code };
          }
          return mat;
        });
        this.toastr.success('Item edited succefully', 'Success');
      },
      error: (err: any) => {
        this._DashboardService.isLoading(false);
        this.toastr.error('Some error occured', 'Error');
      },
    });
    this.closeModal();
    this.isUpdate = false;
    this.updateListData = {};
    this.FormGroupData = this.formBuilder.group({
      name: ['', Validators.required],
      unitCalculated: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  updateModal(data: any) {
    const modal = this.defaultModal.nativeElement as HTMLElement;
    const modalOverlay = document.getElementById('modal-backdrop');

    if (modal && modalOverlay) {
      //modal toggle settings
      modal.classList.toggle('hidden');
      modal.classList.toggle('flex');
      modalOverlay.classList.toggle('hidden');
    }

    this.isUpdate = true;
    this.updateListData = data;
    this.FormGroupData = this.formBuilder.group({
      name: [data.name, Validators.required],
      unitCalculated: [data.unitCalculated, Validators.required],
      price: [data.price, Validators.required],
    });
    this.FormGroupData.valueChanges;
  }
}
