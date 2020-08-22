import { ChangeDetectorRef, Component, isDevMode, OnInit } from '@angular/core';
import { polling, tapOnce } from '@datorama/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs';

import { AppAuthService } from '@yr/auth/app-auth.service';
import { UserInfo } from '@yr/auth/state/auth.model';
import { AuthQuery } from '@yr/auth/state/auth.query';
import { formatNumber } from '@yr/shared/utils';
import { MessageCenterService } from '@yr/user/message-center/message-center.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  user$: Observable<UserInfo>;
  newMessages = 0;

  constructor(
    private appAuthService: AppAuthService,
    private authQuery: AuthQuery,
    private messageService: MessageCenterService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.user$ = this.authQuery.select('user').pipe(
      tapOnce(user => {
        this.startMessagePolling(user._id);
      })
    );
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
    polling(this.messageService.getNewMessages(id), fetchInterval)
      .pipe(untilDestroyed(this))
      .subscribe(newMessages => {
        if (isDevMode()) {
          console.log(
            'Fetched new messages, current count is: ',
            newMessages.length
          );
        }
        const needsUpdate =
          this.newMessages === 0
            ? newMessages.length > 0
            : newMessages.length === 0;
        this.newMessages = newMessages.length;
        needsUpdate && this.cdr.detectChanges();
      });
  }
}
