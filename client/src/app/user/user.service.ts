import {Injectable} from "@angular/core";
import {UserDataService} from "./user.data-service";

@Injectable()
export class UserService {
  constructor(private dataService: UserDataService) {}

  updateProfile() {
    return this.dataService.updateProfile();
  }

  getProductsList() {
    return this.dataService.getProductsList();
  }

  getOrdersList() {
    return this.dataService.getOrdersList();
  }

}
