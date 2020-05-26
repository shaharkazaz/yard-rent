import {Injectable} from "@angular/core";
import {UserDataService} from "./user.data-service";

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private dataService: UserDataService) {}

  updateUser(id: string, user) {
    return this.dataService.updateProfile(id, user);
  }

  getProductsList() {
    return this.dataService.getProductsList();
  }

  getOrdersList() {
    return this.dataService.getOrdersList();
  }

  getUser(id: string) {
    return this.dataService.getUserById(id);
  }

  getMessages(id: string) {
    return this.dataService.getMessages(id);
  }
}
