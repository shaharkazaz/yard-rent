import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {parseUrl} from "../shared/utils";
import {URI_CONSTANTS} from "../shared/constants/uri.contants";

type OrderDetails = {
  rewards: number;
  products: string[]
};

@Injectable()
export class OrdersService {

  constructor(private http: HttpClient) {}

  placeOrder(details: OrderDetails) {
    return this.http.post<{orderId: string}>(parseUrl(URI_CONSTANTS.orders.placeOrder), details);
  }

}
