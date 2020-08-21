import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  DatoButtonModule,
  DatoGridV2Module,
  DatoInputModule,
  DatoLoadersModule
} from '@datorama/core';
import { TranslocoModule } from '@ngneat/transloco';

import { ManagementBarChartComponent } from './statistics/bar-chart/management-bar-chart.component';
import { ManagementPieChartComponent } from './statistics/pie-chart/management-pie-chart.component';
import { StatisticsComponent } from './statistics/statistics/statistics.component';
import { UsersManagementComponent } from './users/users-management.component';

const api = [
  StatisticsComponent,
  ManagementPieChartComponent,
  UsersManagementComponent,
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
