import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  itemsPerPage = 20;
  searchTerm = ''; // Variable to store the search term

  //selected modal
  modalSelectedOrder: string | null = null;
  modalSelectedOrderStatus: number | null = null;

  constructor(private router: Router, private route: ActivatedRoute) {}

  products = [
    {
      client: 'Dhiraj Jyadav',
      mob: 1321,
      add: {
        city: 'malappuram',
        location: 'kottakkal',
        link: '',
      },
      ordStatus: 1,
      ordStartDate: new Date(Date.now()).toLocaleDateString(),
      lastApprovedBy: 'Safdar Hashimi',
      _id: 'alkdjfalgdq-3r1',
      orderNumber: 'ORD-00001',
    },
    {
      client: 'Dhiraj Jyadav',
      mob: 1321,
      add: {
        city: 'malappuram',
        location: 'kottakkal',
        link: '',
      },
      ordStatus: 2,
      ordStartDate: new Date(Date.now()).toLocaleDateString(),
      lastApprovedBy: 'Safdar Hashimi',
      _id: 'alkdjfalqdq-3r1',
      orderNumber: 'ORD-00002',
    },
    {
      client: 'Dhiraj Jyadav',
      mob: 1321,
      add: {
        city: 'malappuram',
        location: 'kottakkal',
        link: '',
      },
      ordStatus: 3,
      ordStartDate: new Date(Date.now()).toLocaleDateString(),
      lastApprovedBy: 'Safdar Hashimi',
      _id: 'alkdjfaltdq-3r1',
      orderNumber: 'ORD-00003',
    },
    {
      client: 'Dhiraj Jyadav',
      mob: 1321,
      add: {
        city: 'malappuram',
        location: 'kottakkal',
        link: '',
      },
      ordStatus: 4,
      ordStartDate: new Date(Date.now()).toLocaleDateString(),
      lastApprovedBy: 'Safdar Hashimi',
      _id: 'alkdjfalydq-3r1',
      orderNumber: 'ORD-00004',
    },
    {
      client: 'Dhiraj Jyadav',
      mob: 1321,
      add: {
        city: 'malappuram',
        location: 'kottakkal',
        link: '',
      },
      ordStatus: 5,
      ordStartDate: new Date(Date.now()).toLocaleDateString(),
      lastApprovedBy: 'Safdar Hashimi',
      _id: 'alkdjfalqdq-3r1',
      orderNumber: 'ORD-00005',
    },
    {
      client: 'Dhiraj Jyadav',
      mob: 1321,
      add: {
        city: 'malappuram',
        location: 'kottakkal',
        link: '',
      },
      ordStatus: 6,
      ordStartDate: new Date(Date.now()).toLocaleDateString(),
      lastApprovedBy: 'Safdar Hashimi',
      _id: 'alkdj2alqdq-3r1',
      orderNumber: 'ORD-00005',
    },
    {
      client: 'Dhiraj Jyadav',
      mob: 1321,
      add: {
        city: 'malappuram',
        location: 'kottakkal',
        link: '',
      },
      ordStatus: 7,
      ordStartDate: new Date(Date.now()).toLocaleDateString(),
      lastApprovedBy: 'Safdar Hashimi',
      _id: 'alkdjralqdq-3r1',
      orderNumber: 'ORD-00005',
    },
    {
      client: 'Dhiraj Jyadav',
      mob: 1321,
      add: {
        city: 'malappuram',
        location: 'kottakkal',
        link: '',
      },
      ordStatus: 8,
      ordStartDate: new Date(Date.now()).toLocaleDateString(),
      lastApprovedBy: 'Safdar Hashimi',
      _id: 'alkdjaalqdq-3r1',
      orderNumber: 'ORD-00005',
    },
    {
      client: 'Dhiraj Jyadav',
      mob: 1321,
      add: {
        city: 'malappuram',
        location: 'kottakkal',
        link: '',
      },
      ordStatus: 9,
      ordStartDate: new Date(Date.now()).toLocaleDateString(),
      lastApprovedBy: 'Safdar Hashimi',
      _id: 'alkdjfaljdq-3r1',
      orderNumber: 'ORD-00005',
    },
    {
      client: 'Dhiraj Jyadav',
      mob: 1321,
      add: {
        city: 'malappuram',
        location: 'kottakkal',
        link: '',
      },
      ordStatus: 10,
      ordStartDate: new Date(Date.now()).toLocaleDateString(),
      lastApprovedBy: 'Safdar Hashimi',
      _id: 'alkdjfilqdq-3r1',
      orderNumber: 'ORD-00005',
    },
    {
      client: 'Dhiraj Jyadav',
      mob: 1321,
      add: {
        city: 'malappuram',
        location: 'kottakkal',
        link: '',
      },
      ordStatus: 11,
      ordStartDate: new Date(Date.now()).toLocaleDateString(),
      lastApprovedBy: 'Safdar Hashimi',
      _id: 'alkdjfklqdq-3r1',
      orderNumber: 'ORD-00005',
    },
    {
      client: 'Dhiraj Jyadav',
      mob: 1321,
      add: {
        city: 'malappuram',
        location: 'kottakkal',
        link: '',
      },
      ordStatus: 12,
      ordStartDate: new Date(Date.now()).toLocaleDateString(),
      lastApprovedBy: 'Safdar Hashimi',
      _id: 'alkdjfkltdq-3r1',
      orderNumber: 'ORD-00005',
    },
    // Add more products as needed
  ];

  ngOnInit(): void {
    this.closeModal();
    initFlowbite();
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

  // get the product data to transfer the data
  getCurrentProject() {
    const { id } = this.route.snapshot.queryParams;

    const currentData = this.products.filter((el) => el._id === id)[0];

    return currentData;
  }

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
