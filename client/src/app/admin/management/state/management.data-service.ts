import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URI_CONSTANTS } from '../../../shared/constants/uri.contants';
import { parseUrl } from '../../../shared/utils';
import {OrdersPerCategoryData, WeeklyData} from './management.types';

@Injectable()
export class ManagementDataService {
  constructor(private http: HttpClient) {}

  getWeeklyData() {
    return this.http.get<WeeklyData>(
      parseUrl(URI_CONSTANTS.management.getWeeklyData)
    );
  }

  getOrdersPerCategory() {
    return this.http.get<OrdersPerCategoryData>(
      parseUrl(URI_CONSTANTS.management.getOrdersPerCategory)
    );
  }

  getAllUsers() {
    return this.http.get<any>(parseUrl(URI_CONSTANTS.management.getAllUsers));
  }

  deleteUser(id: string) {
    return this.http.delete<any>(
      parseUrl(URI_CONSTANTS.management.deleteUser, { id })
    );
  }

  updateUser(id: string, value) {
    return this.http.patch<any>(
      parseUrl(URI_CONSTANTS.management.updateUser, { id }),
      value
    );
  }
}
