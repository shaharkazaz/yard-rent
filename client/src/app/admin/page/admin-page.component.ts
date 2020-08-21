import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ManagementDataService } from '../management/state/management.data-service';
import { ManagementQuery } from '../management/state/management.query';
import { ManagementService } from '../management/state/management.service';
import { ManagementStore } from '../management/state/management.store';

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
