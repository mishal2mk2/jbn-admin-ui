import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavHeaderComponent } from './partials/nav-header/nav-header.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { MaterialListComponent } from './material/material-list/material-list.component';
import { ProjectDetailsComponent } from './project/project-details/project-details.component';
import { ProjectCreateComponent } from './project/project-create/project-create.component';
import { ProjectEditComponent } from './project/project-edit/project-edit.component';
import { mainAdminRoleGuard } from '../helpers/guard/main-admin-role.guard';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: NavHeaderComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'project',
        component: ProjectListComponent,
      },
      {
        path: 'project/create',
        canActivate: [mainAdminRoleGuard],
        component: ProjectCreateComponent,
      },
      {
        path: 'project/edit',
        component: ProjectEditComponent,
      },
      {
        path: 'project/:id',
        component: ProjectDetailsComponent,
      },
      {
        path: 'users',
        canActivate: [mainAdminRoleGuard],
        component: UserListComponent,
      },
      {
        path: 'materials',
        canActivate: [mainAdminRoleGuard],
        component: MaterialListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
