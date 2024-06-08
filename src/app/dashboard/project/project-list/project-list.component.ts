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
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
})
export class ProjectListComponent implements OnInit, OnDestroy {
  @ViewChild('statusChangeModal') defaultModal!: ElementRef;
  @ViewChild('masterStatusApproveModal') masterStatusApproveModal!: ElementRef;

  dropdownOpen: boolean = false;
  NavigateSubscription!: Subscription;
  isRefreshData = 1;
  isMainAdmin = false;
  masterModalStatus: any[] = [];

  // Pagination variables
  currentPage = 1;
  itemsPerPage = 20;
  searchTerm = ''; // Variable to store the search term

  //selected modal
  modalSelectedOrder: string | null = null;
  modalSelectedOrderStatus: number | null = null;
  modalSelectedOrderApproveBtn!: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _ProjectService: ProjectService,
    private _CommonService: CommonService,
    private _DashboardService: DashboardService,
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
    this._DashboardService.isLoading(true);
    this._ProjectService.getAllProjects().subscribe((res) => {
      this._DashboardService.isLoading(false);
      this.products = res.data;

      // Mange button disable section logic
      this.products = this.products.map((item) => {
        return {
          ...item,
          isAccessToOpen: this._CommonService.statusRoleBasesAccess(
            item.orderStatus
          ),
        };
      });

      // Take the Role of user For Filter project data
      const userData = this._CommonService.getAllUserData();

      if (userData) {
        const { role } = userData;

        // Mange if the role is main admin want to show master Modal
        this.isMainAdmin =
          this._CommonService.MainAdminRoleArray.includes(role);

        // Filter the data connect to role based
        this.products = this.products.filter((el) =>
          this._CommonService.filterProjectWithRoleBased(role, el.orderStatus)
        );
      }
    });
  }

  // Close the modal section
  closeModal() {
    const defaultModal = this.defaultModal?.nativeElement as HTMLElement;
    const masterStatusApproveModal = this.masterStatusApproveModal
      ?.nativeElement as HTMLElement;
    const modalOverlay = document.getElementById('modal-backdrop');

    // Navigate to the same route with the query parameter
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { id: null },
      queryParamsHandling: 'merge',
    });

    //modal toggle settings
    if (defaultModal && modalOverlay) {
      defaultModal.classList.remove('flex');
      defaultModal.classList.add('hidden');

      modalOverlay.classList.add('hidden');
    }

    if (masterStatusApproveModal && modalOverlay) {
      masterStatusApproveModal.classList.add('hidden');
      masterStatusApproveModal.classList.remove('flex');
      modalOverlay.classList.add('hidden');
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

  // Open modal for the Modal

  toggleMasterModal(data: { orderStatus: number; orderId: string }) {
    this.masterModalStatus = [];

    for (let i = 1; i <= data.orderStatus; i++) {
      if (data.orderStatus === i) {
        this.masterModalStatus.push({
          status: i,
          id: data.orderId,
          isApproveBtnShow: true,
        });
      } else {
        this.masterModalStatus.push({
          status: i,
          id: data.orderId,
          isApproveBtnShow: false,
        });
      }
    }

    // Modal Section Logic
    const modal = this.masterStatusApproveModal.nativeElement as HTMLElement;
    const modalOverlay = document.getElementById('modal-backdrop');

    if (modal && modalOverlay) {
      //modal toggle settings
      modal.classList.toggle('hidden');
      modal.classList.toggle('flex');
      modalOverlay.classList.toggle('hidden');
    }
  }

  // Open the modal for approve the status
  toggleModal(data: {
    orderStatus: number;
    orderId: string;
    isApproveBtnShow: boolean;
  }) {
    // Close the modal is there is
    this.closeModal();

    this.modalSelectedOrderApproveBtn = data.isApproveBtnShow;

    // Check the role based Access Logic
    const isHaveRoleAccess = this._CommonService.statusRoleBasesAccess(
      data.orderStatus
    );

    if (!isHaveRoleAccess) {
      return;
    }

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
