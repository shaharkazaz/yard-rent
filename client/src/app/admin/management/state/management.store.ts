import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { WeeklyData } from './management.types';

export interface ManagementState {
  weeklyData: WeeklyData;
  users: any[];
}

export function createInitialState(): ManagementState {
  return {
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
