import { Injectable } from '@angular/core';
import { ManagementStore } from './management.store';
import { tap } from 'rxjs/operators';
import { ManagementDataService } from './management.data-service';
import { ManagementQuery } from './management.query';

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

  getAllUsers() {
    return this.dataService
      .getAllUsers()
      .pipe(tap(users => this.managementStore.update({ users })));
  }

  deleteUser(id: string) {
    return this.dataService.deleteUser(id).pipe(
      tap(() => {
        const currentUsers = this.managementQuery.getValue().users;
        this.managementStore.update({
          users: currentUsers.filter(user => user._id !== id)
        });
      })
    );
  }

  updateUser(id, value) {
    return this.dataService.updateUser(id, value);
  }
}
