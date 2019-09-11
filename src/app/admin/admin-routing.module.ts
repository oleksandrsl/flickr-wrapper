import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { OnlyAdminUsersGuard } from './admin-user-guard';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

const routes: Routes = [{
  path: 'admin',
  canActivate: [OnlyAdminUsersGuard],
  children: [{
    path: '',
    component: AdminComponent
  }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }
