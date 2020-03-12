import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './page/admin-page.component';
import { UsersManagementComponent } from './management/users/users-management.component';
import { ManagementModule } from './management/management.module';
import { ManagementUserDetailsComponent } from './management/users/user-details/management-user-details.component';
import { StatisticsComponent } from './management/statistics/statistics/statistics.component';
import { TranslocoModule } from '@ngneat/transloco';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
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
        children: [
          {
            path: '',
            component: UsersManagementComponent
          },
          {
            path: ':id',
            component: ManagementUserDetailsComponent
          }
        ]
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
