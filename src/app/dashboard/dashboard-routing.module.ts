import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavHeaderComponent } from './partials/nav-header/nav-header.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { MaterialListComponent } from './material/material-list/material-list.component';
import { ProjectDetailsComponent } from './project/project-details/project-details.component';
import { ProjectCreateComponent } from './project/project-create/project-create.component';
import { ProjectEditComponent } from './project/project-edit/project-edit.component';

const routes: Routes = [
  {
    path: '',
    component: NavHeaderComponent,
    children: [
      {
        path: '',
        component: ProjectListComponent,
      },
      {
        path: 'project',
        component: ProjectListComponent,
        children: [
          {
            path: 'create',
            component: ProjectCreateComponent,
          },
          {
            path: 'edit',
            component: ProjectEditComponent,
          },
          {
            path: ':id',
            component: ProjectDetailsComponent,
          },
        ],
      },
      {
        path: 'users',
        component: UserListComponent,
      },
      {
        path: 'materials',
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
