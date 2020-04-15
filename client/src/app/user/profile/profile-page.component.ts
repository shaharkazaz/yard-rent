import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AuthQuery} from '../../auth/state/auth.query';
import {Router} from '@angular/router';
import {AppAuthService} from "../../auth/app-auth.service";
import {User} from "../../auth/state/auth.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  user: User;
  constructor(
    private authQuery: AuthQuery,
    private appAuthService: AppAuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.authQuery.getValue().user;
  }

  logout() {
    this.appAuthService.logout();
  }
}
