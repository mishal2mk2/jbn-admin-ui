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
import { Form2Component } from './partials/status-forms/form-2/form-2.component';
import { Form3Component } from './partials/status-forms/form-3/form-3.component';
import { FormErrorSpanComponent } from './partials/form-error-span/form-error-span.component';
import { Form4Component } from './partials/status-forms/form-4/form-4.component';
import { Form5Component } from './partials/status-forms/form-5/form-5.component';
import { Form6Component } from './partials/status-forms/form-6/form-6.component';
import { Form7Component } from './partials/status-forms/form-7/form-7.component';
import { Form8Component } from './partials/status-forms/form-8/form-8.component';
import { Form9Component } from './partials/status-forms/form-9/form-9.component';
import { Form10Component } from './partials/status-forms/form-10/form-10.component';
import { Form11Component } from './partials/status-forms/form-11/form-11.component';
import { Form12Component } from './partials/status-forms/form-12/form-12.component';
import { StatusCodeToValuePipe } from './project/pipe/status-code-to-value.pipe';
import { ProdStatusToValuePipe } from './project/pipe/prod-status-to-value.pipe';
import { DarkModeToggleButtonComponent } from './partials/dark-mode-toggle-button/dark-mode-toggle-button.component';
import { Form13Component } from './partials/status-forms/form-13/form-13.component';
import { RolePipePipe } from './partials/pipe/role-pipe.pipe';
import { DashboardComponent } from './dashboard.component';
import { FileManageModalComponent } from './partials/file-manage-modal/file-manage-modal.component';
import { BasicUserStaticComponent } from './common/basic-user-static/basic-user-static.component';
import { CustomerStaticComponent } from './common/customer-static/customer-static.component';
import { Form1Component } from './partials/status-forms/form-1/form-1.component';
import { WorkerListComponent } from './worker/worker-list/worker-list.component';

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
    Form2Component,
    Form3Component,
    FormErrorSpanComponent,
    Form4Component,
    Form5Component,
    Form6Component,
    Form7Component,
    Form8Component,
    Form9Component,
    Form10Component,
    Form11Component,
    Form12Component,
    StatusCodeToValuePipe,
    ProdStatusToValuePipe,
    DarkModeToggleButtonComponent,
    Form13Component,
    RolePipePipe,
    DashboardComponent,
    FileManageModalComponent,
    BasicUserStaticComponent,
    CustomerStaticComponent,
    Form1Component,
    WorkerListComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class DashboardModule {}
