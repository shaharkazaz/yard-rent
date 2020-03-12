import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthQuery } from '../../auth/state/auth.query';
import { AuthService } from '../../auth/state/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  user: any;
  constructor(
    private authQuery: AuthQuery,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.authQuery.getValue().user;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['home']);
  }
}
