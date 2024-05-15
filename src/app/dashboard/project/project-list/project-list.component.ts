import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
})
export class ProjectListComponent {
  dropdownOpen: boolean = false;

  //selected modal
  modalSelectedOrder: string | null = null;
  modalSelectedOrderStatus: number | null = null;
  @ViewChild('defaultModal') defaultModal!: ElementRef;
  
  constructor(private elementRef: ElementRef) {}

  products = [
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
  }

  closeModal() {
    const modal = this.defaultModal?.nativeElement as HTMLElement;
    modal?.classList?.add('hidden');
    modal?.setAttribute('aria-hidden', 'true');
  }
  accept() {}
  // Sample data, replace this with your actual data

  // Pagination variables
  currentPage = 1;
  itemsPerPage = 10;
  searchTerm = ''; // Variable to store the search term

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
    modal.classList.toggle('hidden');
    modal.setAttribute(
      'aria-hidden',
      modal.classList.contains('hidden') ? 'true' : 'false'
    );

    //setting modal for which order
    this.modalSelectedOrder = data.orderId;
    this.modalSelectedOrderStatus = data.orderStatus;
  }
}
