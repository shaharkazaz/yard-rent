import {ChangeDetectorRef, Component, isDevMode, OnInit} from '@angular/core';
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

  constructor(private appAuthService: AppAuthService, private authQuery: AuthQuery, private userService: UserService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.user$ = this.authQuery.select('user').pipe(tapOnce((user) => {
      this.startMessagePolling(user._id);
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
    const fetchInterval = 5000;
    polling(this.userService.getNewMessages(id), fetchInterval).pipe(untilDestroyed(this)).subscribe((newMessages) => {
      if(isDevMode()) {
        console.log("Fetched new messages, current count is: ", newMessages.length);
      }
      const needsUpdate = this.newMessages === 0 ? newMessages.length > 0 : newMessages.length === 0;
      this.newMessages = newMessages.length;
      needsUpdate && this.cdr.detectChanges();
    });
  }
}
