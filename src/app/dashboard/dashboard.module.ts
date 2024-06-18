import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavHeaderComponent } from './partials/nav-header/nav-header.component';
import { SidebarComponent } from './partials/sidebar/sidebar.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ProjectDetailsComponent } from './project/project-details/project-details.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { MaterialListComponent } from './material/material-list/material-list.component';
import { ProjectCreateComponent } from './project/project-create/project-create.component';
import { ProjectEditComponent } from './project/project-edit/project-edit.component';
import { MaterialEditComponent } from './material/material-edit/material-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DrawingEnteringFormComponent } from './partials/status-forms/drawing-entering-form/drawing-entering-form.component';
import { MaterialEstimateFormComponent } from './partials/status-forms/material-estimate-form/material-estimate-form.component';
import { FormErrorSpanComponent } from './partials/form-error-span/form-error-span.component';
import { PaymentEnterFormComponent } from './partials/status-forms/payment-enter-form/payment-enter-form.component';
import { MaterialArrivalFormComponent } from './partials/status-forms/material-arrival-form/material-arrival-form.component';
import { ProductionFormComponent } from './partials/status-forms/production-form/production-form.component';
import { DeliveryFormComponent } from './partials/status-forms/delivery-form/delivery-form.component';
import { InstallationFormComponent } from './partials/status-forms/installation-form/installation-form.component';
import { AwaitingServiceFormComponent } from './partials/status-forms/awaiting-service-form/awaiting-service-form.component';
import { ServiceFormComponent } from './partials/status-forms/service-form/service-form.component';
import { ToCloseFormComponent } from './partials/status-forms/to-close-form/to-close-form.component';
import { ProjectCompleteFormComponent } from './partials/status-forms/project-complete-form/project-complete-form.component';
import { StatusCodeToValuePipe } from './project/pipe/status-code-to-value.pipe';
import { ProdStatusToValuePipe } from './project/pipe/prod-status-to-value.pipe';
import { DarkModeToggleButtonComponent } from './partials/dark-mode-toggle-button/dark-mode-toggle-button.component';
import { CancellationUndoFormComponent } from './partials/status-forms/cancellation-undo-form/cancellation-undo-form.component';
import { RolePipePipe } from './partials/pipe/role-pipe.pipe';
import { DashboardComponent } from './dashboard.component';
import { FileManageModalComponent } from './partials/file-manage-modal/file-manage-modal.component';
import { BasicUserStaticComponent } from './common/basic-user-static/basic-user-static.component';
import { CustomerStaticComponent } from './common/customer-static/customer-static.component';
import { OrderEnteringFormComponent } from './partials/status-forms/order-entering-form/order-entering-form.component';
import { WorkerListComponent } from './worker/worker-list/worker-list.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    NavHeaderComponent,
    SidebarComponent,
    ProjectDetailsComponent,
    ProjectListComponent,
    UserListComponent,
    MaterialListComponent,
    ProjectCreateComponent,
    ProjectEditComponent,
    MaterialEditComponent,
    DrawingEnteringFormComponent,
    MaterialEstimateFormComponent,
    FormErrorSpanComponent,
    PaymentEnterFormComponent,
    MaterialArrivalFormComponent,
    ProductionFormComponent,
    DeliveryFormComponent,
    InstallationFormComponent,
    AwaitingServiceFormComponent,
    ServiceFormComponent,
    ToCloseFormComponent,
    ProjectCompleteFormComponent,
    StatusCodeToValuePipe,
    ProdStatusToValuePipe,
    DarkModeToggleButtonComponent,
    CancellationUndoFormComponent,
    RolePipePipe,
    DashboardComponent,
    FileManageModalComponent,
    BasicUserStaticComponent,
    CustomerStaticComponent,
    OrderEnteringFormComponent,
    WorkerListComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    PdfViewerModule,
  ],
})
export class DashboardModule {}
