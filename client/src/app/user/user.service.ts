import {Injectable} from "@angular/core";
import {UserDataService} from "./user.data-service";
import {User} from "../auth/state/auth.model";

@Injectable()
export class UserService {
  constructor(private dataService: UserDataService) {}

  updateProfile(id: string, user: Partial<User>) {
    return this.dataService.updateProfile(id, user);
  }

  getProductsList() {
    return this.dataService.getProductsList();
  }

  getOrdersList() {
    return this.dataService.getOrdersList();
  }

}
