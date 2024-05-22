import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../helpers/service/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
})
export class ProjectListComponent {
  @ViewChild('statusChangeModal') defaultModal!: ElementRef;

  dropdownOpen: boolean = false;

  // Pagination variables
  currentPage = 1;
  itemsPerPage = 20;
  searchTerm = ''; // Variable to store the search term

  //selected modal
  modalSelectedOrder: string | null = null;
  modalSelectedOrderStatus: number | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _ProjectService: ProjectService
  ) {}

  products: any = [];

  ngOnInit(): void {
    this.closeModal();

    this._ProjectService.getAllProjects().subscribe((res) => {
      this.products = res.data;
      console.log(this.products);
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

  // Function to get the current page of products
  getCurrentPageProducts() {
    const filteredProducts = this.products.filter(
      (product: any) =>
        product.client.name
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        product.orderStatus
          .toString()
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        product.orderNumber
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
    );

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }

  // Function to handle page change
  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  toggleModal(data: { orderStatus: number; orderId: string }) {
    const modal = this.defaultModal.nativeElement as HTMLElement;
    const modalOverlay = document.getElementById('modal-backdrop');

    if (modal && modalOverlay) {
      // Add the Order id to query
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { id: data.orderId },
        queryParamsHandling: 'merge',
      });

      //modal toggle settings
      modal.classList.toggle('hidden');
      modal.classList.toggle('flex');
      modalOverlay.classList.toggle('hidden');

      //setting modal for which order
      this.modalSelectedOrder = data.orderId;
      this.modalSelectedOrderStatus = data.orderStatus;
    }
  }
}
