import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavHeaderComponent } from './partials/nav-header/nav-header.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { MaterialListComponent } from './material/material-list/material-list.component';
import { ProjectDetailsComponent } from './project/project-details/project-details.component';

const routes: Routes = [
    {
      path:'',
      component:NavHeaderComponent,
      children:[
        {
          path:'',
          component:ProjectListComponent,
        },
        {
          path:'projects',
          component:ProjectListComponent,
        },
        {
          path:'projects/:id',
          component:ProjectDetailsComponent,
        },
        {
          path:'users',
          component:UserListComponent,
        },
        {
          path:'materials',
          component:MaterialListComponent,
        },
      ]
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }