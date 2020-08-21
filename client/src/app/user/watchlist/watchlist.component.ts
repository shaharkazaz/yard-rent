import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { skip } from 'rxjs/operators';

import { CARD_WIDTH } from '@yr/marketplace/item-card/item-card-loader/item-card-loader.component';
import { Product } from '@yr/marketplace/marketplace.types';

import { UserService } from '../user.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WatchlistComponent implements OnInit, OnDestroy {
  items: Product[];
  watchlist: Product[] = [];
  loading = true;
  loadersCount: any[];
  private readonly LOAD_BUFFER = 20;
  private buffer = this.LOAD_BUFFER;

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnDestroy(): void {}

  ngOnInit() {
    this.loadersCount = new Array(
      Math.floor(document.documentElement.clientWidth / CARD_WIDTH)
    );
    this.userService
      .getWatchlistProducts()
      .pipe(untilDestroyed(this))
      .subscribe(watchlist => {
        this.watchlist = watchlist;
        this.items = this.watchlist.slice(0, this.buffer);
        this.loading = false;
        this.subscribeToRemoval();
        this.cdr.detectChanges();
      });
  }

  loadMore() {
    this.buffer += this.LOAD_BUFFER;
    this.items = this.watchlist.slice(0, this.buffer);
  }

  private subscribeToRemoval() {
    this.userService
      .selectWatchlistIds()
      .pipe(skip(1), untilDestroyed(this))
      .subscribe(ids => {
        const isFavorite = product => ids.includes(product._id);
        this.watchlist = this.watchlist.filter(isFavorite);
        this.items = this.items.filter(isFavorite);
        this.cdr.detectChanges();
      });
  }
}
