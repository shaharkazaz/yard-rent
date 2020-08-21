import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';

import { AppAuthService } from '@yr/auth/app-auth.service';
import { UserInfo } from '@yr/auth/state/auth.model';
import { AuthQuery } from '@yr/auth/state/auth.query';
import { AuthService } from '@yr/auth/state/auth.service';
import { formatNumber } from '@yr/shared/utils';

@Component({
  selector: 'app-profile',
  templateUrl: './profile-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  user: UserInfo;
  userProfile: FormGroup;

  constructor(
    private authQuery: AuthQuery,
    private fb: FormBuilder,
    private appAuthService: AppAuthService,
    private authService: AuthService
  ) {}

  ngOnDestroy(): void {}

  ngOnInit() {
    this.authService
      .getUserByToken()
      .pipe(untilDestroyed(this))
      .subscribe(user => {
        this.user = user;
        this.userProfile = this.fb.group({
          name: [this.user.name]
        });
      });
  }

  logout() {
    this.appAuthService.logout();
  }

  formatNumber(rewards: number) {
    return formatNumber(rewards);
  }
}
