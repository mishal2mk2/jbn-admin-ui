import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../service/project.service';
import { initFlowbite } from 'flowbite';
import { Subscription } from 'rxjs';
import { CommonService } from '../../../helpers/service/common.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
})
export class ProjectListComponent implements OnInit, OnDestroy {
  @ViewChild('statusChangeModal') defaultModal!: ElementRef;

  dropdownOpen: boolean = false;
  NavigateSubscription!: Subscription;
  isRefreshData = 1;

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
    private _ProjectService: ProjectService,
    private _CommonService: CommonService
  ) {}

  products: any[] = [];

  ngOnInit(): void {
    this.closeModal();
    initFlowbite();

    this.getAllProduct();

    // Subscribe the Data Transfer for refresh the data and close the old modal
    this.NavigateSubscription =
      this._ProjectService.$ProjectNavigateDataTransfer.subscribe(() => {
        this.closeModal();
        this.getAllProduct();
      });
  }

  // Unsubscribe the data for the data leackage
  ngOnDestroy(): void {
    if (this.NavigateSubscription) this.NavigateSubscription.unsubscribe();
  }

  // Get all product data
  getAllProduct() {
    this._ProjectService.getAllProjects().subscribe((res) => {
      this.products = res.data;

      // Mange button disable section logic
      this.products = this.products.map((item) => {
        return {
          ...item,
          // isAccessToOpen: this._CommonService.statusRoleBasesAccess(
          //   item.orderStatus
          // ),
          isAccessToOpen: true,
        };
      });

      // Take the Role of user For Filter project data
      const userData = this._CommonService.getAllUserData();

      if (userData) {
        const { role } = userData;

        // Filter the data connect to role based
        this.products = this.products.filter((el) =>
          this._CommonService.filterProjectWithRoleBased(role, el.orderStatus)
        );
      }
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
    // Check the role based Access Logic
    const isHaveRoleAccess = this._CommonService.statusRoleBasesAccess(
      data.orderStatus
    );

    // if (!isHaveRoleAccess) {
    //   return;
    // }

    // Modal Section Logic
    const modal = this.defaultModal.nativeElement as HTMLElement;
    const modalOverlay = document.getElementById('modal-backdrop');

    if (modal && modalOverlay) {
      // Add the Order id to query
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { id: data.orderId },
        queryParamsHandling: 'merge',
      });

      // Connect the event emitter
      this.isRefreshData++;

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
