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
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DashboardModule { }
