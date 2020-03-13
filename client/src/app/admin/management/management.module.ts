import { NgModule } from '@angular/core';
import { ManagementPieChartComponent } from './statistics/pie-chart/management-pie-chart.component';
import { ManagementBarChartComponent } from './statistics/bar-chart/management-bar-chart.component';
import {
  DatoButtonModule,
  DatoGridV2Module,
  DatoInputModule,
  DatoLoadersModule
} from '@datorama/core';
import { CommonModule } from '@angular/common';
import { UsersManagementComponent } from './users/users-management.component';
import { ManagementUserDetailsComponent } from './users/user-details/management-user-details.component';
import { RouterModule } from '@angular/router';
import { StatisticsComponent } from './statistics/statistics/statistics.component';
import { TranslocoModule } from '@ngneat/transloco';
import { ReactiveFormsModule } from '@angular/forms';

const api = [
  StatisticsComponent,
  ManagementPieChartComponent,
  UsersManagementComponent,
  ManagementUserDetailsComponent,
  ManagementBarChartComponent
];

@NgModule({
  imports: [
    DatoLoadersModule,
    CommonModule,
    DatoGridV2Module,
    RouterModule,
    DatoButtonModule,
    TranslocoModule,
    DatoInputModule,
    ReactiveFormsModule
  ],
  declarations: api,
  exports: api
})
export class ManagementModule {}
