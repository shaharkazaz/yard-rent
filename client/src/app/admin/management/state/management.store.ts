import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { OrdersPerCategoryData, WeeklyData } from './management.types';

export interface ManagementState {
  ordersPerCategory: OrdersPerCategoryData;
  weeklyData: WeeklyData;
  users: any[];
}

export function createInitialState(): ManagementState {
  return {
    ordersPerCategory: [],
    weeklyData: [],
    users: []
  };
}

@Injectable()
@StoreConfig({ name: 'management' })
export class ManagementStore extends Store<ManagementState> {
  constructor() {
    super(createInitialState());
  }
}
