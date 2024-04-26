import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavHeaderComponent } from './partials/nav-header/nav-header.component';
import { SidebarComponent } from './partials/sidebar/sidebar.component';
import { ProjectComponent } from './list/project/project.component';
import { UserComponent } from './list/user/user.component';
import { DashboardRoutingModule } from './dashboard-routing.module';



@NgModule({
  declarations: [
    NavHeaderComponent,
    SidebarComponent,
    ProjectComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
