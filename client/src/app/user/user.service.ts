import {Injectable} from "@angular/core";
import {UserDataService} from "./user.data-service";
import {tap} from "rxjs/operators";
import {AuthService} from "../auth/state/auth.service";
import {AuthQuery} from "../auth/state/auth.query";

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private dataService: UserDataService, private authService: AuthService, private authQuery: AuthQuery) {}

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

  getNewMessages(id: string) {
    return this.dataService.getNewMessages(id);
  }

  getWatchlistProducts() {
    return this.dataService.getWatchlist();
  }

  addToWatchlist(productId: string) {
    return this.dataService.addToWatchlist(productId).pipe(tap(() => {
      const info = this.authQuery.getUserInfo();
      const favorites = [...info.favorites, productId];
      this.authService.updateUserInfo({...info, favorites});
    }));
  }

  removeFromWatchlist(productId: string) {
    return this.dataService.removeFromWatchlist(productId).pipe(tap(() => {
      const info = this.authQuery.getUserInfo();
      const favorites = info.favorites.filter(pid => pid !== productId);
      this.authService.updateUserInfo({...info, favorites});
    }));
  }

  selectWatchlistIds() {
    return this.authQuery.select(auth => auth.user.favorites);
  }
}
