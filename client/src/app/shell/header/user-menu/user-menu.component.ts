import { Component, OnInit } from '@angular/core';
import { formatNumber } from '../../../shared/utils';
import {AppAuthService} from "../../../auth/app-auth.service";
import {User} from "../../../auth/state/auth.model";
import {AuthQuery} from "../../../auth/state/auth.query";

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  user: User;

  constructor(private appAuthService: AppAuthService, private authQuery: AuthQuery) { }

  ngOnInit() {
    this.authQuery
      .select(state => state.user)
      .subscribe(user => {
        this.user = user;
      });
  }

  logout() {
    this.appAuthService.logout();
  }

  formatNumber(value: number) {
    return value ? formatNumber(value) : 0;
  }

}
