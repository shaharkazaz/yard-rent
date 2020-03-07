import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  // TODO connect to cart store
  itemsCount$ = of(0);

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  openLoginDialog(view: 'login' | 'sign-up') {
    this.authService.openDialog(view);
  }
}
