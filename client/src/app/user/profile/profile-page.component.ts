import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AuthQuery} from '../../auth/state/auth.query';
import {AppAuthService} from '../../auth/app-auth.service';
import {UserInfo} from '../../auth/state/auth.model';
import {formatNumber} from '../../shared/utils';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../auth/state/auth.service';
import {untilDestroyed} from 'ngx-take-until-destroy';

@Component({
  selector: 'app-profile',
  templateUrl: './profile-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  user: UserInfo;
  userProfile: FormGroup;
  loading = true;

  constructor(
    private authQuery: AuthQuery,
    private fb: FormBuilder,
    private appAuthService: AppAuthService,
    private authService: AuthService
  ) {}

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(): void {}

  ngOnInit() {
    this.authService.getUserByToken().pipe(untilDestroyed(this)).subscribe(user => {
      this.user = user;
      this.loading = false;
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
