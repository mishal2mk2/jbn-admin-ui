import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { initFlowbite } from 'flowbite';

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
  itemsPerPage = 10;
  searchTerm = ''; // Variable to store the search term

  //selected modal
  modalSelectedOrder: string | null = null;
  modalSelectedOrderStatus: number | null = null;

  constructor(private elementRef: ElementRef) {}

  products = [
    {
      client: 'Dhiraj Jyadav',
      ordStatus: 1,
      ordStartDate: new Date(Date.now()).toLocaleDateString(),
      lastApprovedBy: 'Safdar Hashimi',
      _id: 'alkdjfalgdq-3r1',
      orderNumber: 'ORD-00001',
    },
    {
      client: 'Dhiraj Jyadav',
      ordStatus: 2,
      ordStartDate: new Date(Date.now()).toLocaleDateString(),
      lastApprovedBy: 'Safdar Hashimi',
      _id: 'alkdjfalqdq-3r1',
      orderNumber: 'ORD-00002',
    },
    {
      client: 'Dhiraj Jyadav',
      ordStatus: 3,
      ordStartDate: new Date(Date.now()).toLocaleDateString(),
      lastApprovedBy: 'Safdar Hashimi',
      _id: 'alkdjfaltdq-3r1',
      orderNumber: 'ORD-00003',
    },
    {
      client: 'Dhiraj Jyadav',
      ordStatus: 4,
      ordStartDate: new Date(Date.now()).toLocaleDateString(),
      lastApprovedBy: 'Safdar Hashimi',
      _id: 'alkdjfalydq-3r1',
      orderNumber: 'ORD-00004',
    },
    {
      client: 'Dhiraj Jyadav',
      ordStatus: 5,
      ordStartDate: new Date(Date.now()).toLocaleDateString(),
      lastApprovedBy: 'Safdar Hashimi',
      _id: 'alkdjfalqdq-3r1',
      orderNumber: 'ORD-00005',
    },
    // Add more products as needed
  ];

  item = [
    {
      client: 'Dhiraj Jyadav',
      ordStatus: 3,
      ordStartDate: new Date(Date.now()).toLocaleDateString(),
      lastApprovedBy: 'Safdar Hashimi',
      _id: 'alkdjfalkdq-3r1',
      orderNumber: 'ORD-00012',
    },
    // Add more products as needed
  ];

  ngOnInit(): void {
    this.closeModal();
    initFlowbite();
  }

  closeModal() {
    const modal = this.defaultModal?.nativeElement as HTMLElement;
    const modalOverlay = document.getElementById('modal-backdrop');

    if (modal && modalOverlay) {
      modal.classList.toggle('hidden');
      modal.classList.toggle('flex');
      modalOverlay.classList.toggle('hidden');
    }
  }

  // Sample data, replace this with your actual data
  accept() {}

  // Function to get the current page of products
  getCurrentPageProducts() {
    const filteredProducts = this.products.filter(
      (product) =>
        product.client.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        // product.ordStartDate.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.ordStatus
          .toString()
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        product.lastApprovedBy
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
    //modal toggle settings
    const modal = this.defaultModal.nativeElement as HTMLElement;
    const modalOverlay = document.getElementById('modal-backdrop');

    if (modal && modalOverlay) {
      modal.classList.toggle('hidden');
      modal.classList.toggle('flex');
      modalOverlay.classList.toggle('hidden');

      //setting modal for which order
      this.modalSelectedOrder = data.orderId;
      this.modalSelectedOrderStatus = data.orderStatus;
    }
  }
}
