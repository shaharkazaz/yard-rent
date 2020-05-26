import {Component, isDevMode, OnInit} from '@angular/core';
import { formatNumber } from '../../../shared/utils';
import {AppAuthService} from "../../../auth/app-auth.service";
import {UserInfo} from "../../../auth/state/auth.model";
import {AuthQuery} from "../../../auth/state/auth.query";
import {UserService} from "../../../user/user.service";
import {polling, tapOnce} from "@datorama/core";
import {untilDestroyed} from "ngx-take-until-destroy";
import {Observable} from "rxjs";

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  user$: Observable<UserInfo>;
  newMessages = 0;
  constructor(private appAuthService: AppAuthService, private authQuery: AuthQuery, private userService: UserService) { }

  ngOnInit() {
    this.user$ = this.authQuery.select('user').pipe(tapOnce(() => {
      // this.startMessagePolling(user._id);
    }));
  }

  ngOnDestroy() {}

  logout() {
    this.appAuthService.logout();
  }

  formatNumber(value: number) {
    return formatNumber(value);
  }

  private startMessagePolling(id: string) {
    polling(this.userService.getMessages(id), 3000).pipe(untilDestroyed(this)).subscribe((newMessages) => {
      if(isDevMode()) {
        console.log("Fetched new messages, current count is: ", newMessages.length);
      }
      this.newMessages = newMessages.length;
    });
  }
}
