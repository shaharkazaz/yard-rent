import { Component, OnInit } from '@angular/core';
import { formatNumber } from '../../../shared/utils';
import {AppAuthService} from "../../../auth/app-auth.service";
import {UserInfo} from "../../../auth/state/auth.model";
import {AuthQuery} from "../../../auth/state/auth.query";

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  user: UserInfo;

  constructor(private appAuthService: AppAuthService, private authQuery: AuthQuery) { }

  ngOnInit() {
    this.authQuery.select('user')
      .subscribe(user => {
        this.user = user;
      });
  }

  logout() {
    this.appAuthService.logout();
  }

  formatNumber(value: number) {
    return formatNumber(value);
  }

}
