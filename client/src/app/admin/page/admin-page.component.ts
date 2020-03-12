import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ManagementStore } from '../management/state/management.store';
import { ManagementService } from '../management/state/management.service';
import { ManagementQuery } from '../management/state/management.query';
import { ManagementDataService } from '../management/state/management.data-service';

@Component({
  selector: 'app-management-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ManagementStore,
    ManagementService,
    ManagementDataService,
    ManagementQuery
  ]
})
export class AdminPageComponent {}
