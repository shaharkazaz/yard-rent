import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {parseUrl} from "../shared/utils";
import {URI_CONSTANTS} from "../shared/constants/uri.contants";
import {NewProduct, Product} from "../marketplace/marketplace.types";
import {User} from "../auth/state/auth.model";

@Injectable()
export class UserDataService {
  constructor(private http: HttpClient) {}

  updateProfile(id: string, user: Partial<User>) {
    return this.http.post<User>(parseUrl(URI_CONSTANTS.users.update), user);
  }

  getProductsList() {
    return this.http.get<Product[]>(parseUrl(URI_CONSTANTS.users.productsList));
  }

  getOrdersList() {}

}
