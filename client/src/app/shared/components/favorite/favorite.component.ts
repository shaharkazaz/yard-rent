import {ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {toggleClass} from "@datorama/core";
import {HttpClient} from "@angular/common/http";
import {AuthDialogService} from "../../../auth/state/auth-dialog.service";
import {AuthQuery} from "../../../auth/state/auth.query";
import {UserService} from "../../../user/user.service";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteComponent {
  @ViewChild('heart', {static: true}) private heartEl: ElementRef;
  @Input() productId: string;

  private active = false;
  constructor(private http: HttpClient, private authQuery: AuthQuery, private userService: UserService, private authDialogService: AuthDialogService) { }

  ngOnInit() {
    const isFavorite = this.authQuery.isLoggedIn() && this.authQuery.getUserInfo().favorites.includes(this.productId);
    this.active = isFavorite;
    this.updateHeartState();
  }

  toggleActive() {
    this.authDialogService.verifyLoggedIn(() => {
      this.active = !this.active;
      this.updateHeartState();
      (this.active ? this.userService.addToWatchlist(this.productId) : this.userService.removeFromWatchlist(this.productId)).subscribe();
    });
  }

  private updateHeartState() {
    toggleClass(this.heartEl.nativeElement, 'is-active', this.active);
  }
}
