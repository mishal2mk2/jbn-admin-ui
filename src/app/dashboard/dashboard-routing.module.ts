import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavHeaderComponent } from './partials/nav-header/nav-header.component';
import { ProjectComponent } from './list/project/project.component';

const routes: Routes = [
    {
      path:'',
      component:NavHeaderComponent,
      children:[
        {
          path:'',
          component:ProjectComponent,
        }
      ]
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }