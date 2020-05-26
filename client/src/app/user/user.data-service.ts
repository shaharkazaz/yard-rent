import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {parseUrl} from "../shared/utils";
import {URI_CONSTANTS} from "../shared/constants/uri.contants";
import {Product} from "../marketplace/marketplace.types";
import {UserInfo} from "../auth/state/auth.model";

@Injectable({providedIn: 'root'})
export class UserDataService {
  constructor(private http: HttpClient) {}

  updateProfile(id: string, user) {
    return this.http.patch(parseUrl(URI_CONSTANTS.users.updateUser, {id}), {...user});
  }

  getProductsList() {
    return this.http.get<Product[]>(parseUrl(URI_CONSTANTS.users.productsList));
  }

  getOrdersList() {
    return this.http.get<any[]>(parseUrl(URI_CONSTANTS.users.ordersList));
  }

  getUserById(id: string) {
    return this.http.get<Partial<UserInfo>>(parseUrl(URI_CONSTANTS.users.getUserById, {id}));
  }

  getMessages(id: string) {
    return this.http.get<any>(parseUrl(URI_CONSTANTS.users.messages, {id}));
  }
}
