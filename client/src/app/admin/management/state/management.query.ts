import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { ManagementStore, ManagementState } from './management.store';

@Injectable()
export class ManagementQuery extends Query<ManagementState> {
  constructor(protected store: ManagementStore) {
    super(store);
  }
}
