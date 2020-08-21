import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { ManagementDataService } from './management.data-service';
import { ManagementQuery } from './management.query';
import { ManagementStore } from './management.store';

@Injectable()
export class ManagementService {
  constructor(
    private managementStore: ManagementStore,
    private managementQuery: ManagementQuery,
    private dataService: ManagementDataService
  ) {}

  getWeeklyData() {
    return this.dataService
      .getWeeklyData()
      .pipe(tap(weeklyData => this.managementStore.update({ weeklyData })));
  }

  getOrdersPerCategory() {
    return this.dataService
      .getOrdersPerCategory()
      .pipe(
        tap(ordersPerCategory =>
          this.managementStore.update({ ordersPerCategory })
        )
      );
  }

  getAllUsers() {
    return this.dataService
      .getAllUsers()
      .pipe(tap(users => this.managementStore.update({ users })));
  }

  deleteUser(ids: string[]) {
    return this.dataService.deleteUsers(ids).pipe(
      tap(() => {
        const currentUsers = this.managementQuery.getValue().users;
        this.managementStore.update({
          users: currentUsers.filter(user => !ids.includes(user._id))
        });
      })
    );
  }
}
