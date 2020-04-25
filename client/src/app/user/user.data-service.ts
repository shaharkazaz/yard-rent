import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {parseUrl} from "../shared/utils";
import {URI_CONSTANTS} from "../shared/constants/uri.contants";
import {Product} from "../marketplace/marketplace.types";

@Injectable()
export class UserDataService {
  constructor(private http: HttpClient) {}

  updateProfile() {}

  getProductsList() {
    return this.http.get<Product[]>(parseUrl(URI_CONSTANTS.users.productsList));
  }

  getOrdersList() {}

}
