import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AuthQuery} from '../../auth/state/auth.query';
import {AppAuthService} from "../../auth/app-auth.service";
import {UserInfo} from "../../auth/state/auth.model";
import {formatNumber} from "../../shared/utils";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  user: UserInfo;
  userProfile: FormGroup;

  constructor(
    private authQuery: AuthQuery,
    private fb: FormBuilder,
    private appAuthService: AppAuthService,
  ) {}

  ngOnInit() {
    this.user = this.authQuery.getValue().user;
    this.userProfile = this.fb.group({
      name: [this.user.name]
    });
  }

  logout() {
    this.appAuthService.logout();
  }

  formatNumber(rewards: number) {
    return formatNumber(rewards);
  }
}
