import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WorkerService } from '../worker.service';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-worker-list',
  templateUrl: './worker-list.component.html',
  styleUrl: './worker-list.component.css',
})
export class WorkerListComponent implements OnInit {
  @ViewChild('WorkerModal') defaultModal!: ElementRef;

  // Pagination variables
  currentPage = 1;
  itemsPerPage = 20;
  searchTerm = ''; // Variable to store the search term

  workers: {
    name: string;
    _id: string;
    perHourWage: number;
    mobile: number;
  }[] = [];

  FormGroupData!: FormGroup;
  isUpdate: boolean = false;
  updateListData: any = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _WorkerService: WorkerService,
    private toastr: ToastrService,
    private _DashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    //load worker list
    this._DashboardService.isLoading(true);
    this._WorkerService.getWorkerList().subscribe({
      next: (data: any) => {
        this._DashboardService.isLoading(false);
        this.workers = data.data;
      },
      error: (err) => {
        this._DashboardService.isLoading(false);
        this.toastr.error('Error while loading worker list', 'Error');
      },
    });
    //close modal
    this.closeModal();

    this.FormGroupData = this.formBuilder.group({
      name: ['', Validators.required],
      perHourWage: ['', Validators.required],
      mobile: ['', Validators.required],
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
    const filteredWorkerList = this.workers.filter((worker) => {
      return (
        worker.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        worker.mobile
          .toString()
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        worker.perHourWage
          .toString()
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
      );
    });

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return filteredWorkerList.slice(startIndex, endIndex);
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
    this._WorkerService.createWorker(this.FormGroupData.value).subscribe({
      next: (data: any) => {
        this._DashboardService.isLoading(false);
        //pushing new created worker to workers array
        const { name, mobile, perHourWage, _id } = data.data;
        this.workers.push({ name, mobile, perHourWage, _id });

        this.toastr.success('Worker added succefully', 'Success');
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
    this._WorkerService.deleteWorker(id).subscribe({
      next: (data: any) => {
        this._DashboardService.isLoading(false);
        //filtering worker from existing list
        this.workers = this.workers.filter((worker) => {
          return worker._id !== id;
        });

        this.toastr.success('Worker deleted succefully', 'Success');
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
    this._WorkerService.updateWorker(updatedData).subscribe({
      next: (data: any) => {
        this._DashboardService.isLoading(false);
        const { _id, name, mobile, perHourWage } = data.data;

        this.workers = this.workers.map((worker) => {
          if (worker._id === _id) {
            worker = { _id, name, mobile, perHourWage };
          }
          return worker;
        });
        this.toastr.success('Worker edited succefully', 'Success');
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
      perHourWage: ['', Validators.required],
      mobile: ['', Validators.required],
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
      mobile: [data.mobile, Validators.required],
      perHourWage: [data.perHourWage, Validators.required],
    });
    this.FormGroupData.valueChanges;
  }
}
