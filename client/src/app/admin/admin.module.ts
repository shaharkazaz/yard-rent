import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

import { AdminGuard, AuthGuard } from '@yr/shared/route-gurds';

import { ManagementModule } from './management/management.module';
import { StatisticsComponent } from './management/statistics/statistics/statistics.component';
import { UsersManagementComponent } from './management/users/users-management.component';
import { AdminPageComponent } from './page/admin-page.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    canActivateChild: [AuthGuard, AdminGuard],
    children: [
      {
        path: '',
        redirectTo: 'statistics',
        pathMatch: 'full'
      },
      {
        path: 'statistics',
        component: StatisticsComponent
      },
      {
        path: 'management',
        component: UsersManagementComponent
      }
    ]
  }
];

const api = [AdminPageComponent];

@NgModule({
  imports: [RouterModule.forChild(routes), ManagementModule, TranslocoModule],
  declarations: api
})
export class AdminModule {}
