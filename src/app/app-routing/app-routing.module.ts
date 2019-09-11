import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { HomeComponent } from '../home/home.component';
import { SearchHistoryComponent } from '../search-history/search-history.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: 'app/auth/auth.module#AuthModule'
  }, {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule'
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'history',
    component: SearchHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
  declarations: []
})

export class AppRoutingModule { }
