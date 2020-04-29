import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MarketplaceService} from '../state/marketplace.service';
import {Product} from "../marketplace.types";

@Component({
  selector: 'app-marketplace-all-items',
  templateUrl: './marketplace-all-items.component.html',
  styleUrls: ['./marketplace-all-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketplaceAllItemsComponent implements OnInit {
  items: Product[];
  loading = true;
  allResults: Product[] = [];
  loadersCount;

  private readonly LOAD_BUFFER = 20;
  private readonly CARD_WIDTH = 304;

  constructor(private marketplaceService: MarketplaceService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadersCount = new Array(Math.floor(document.documentElement.clientWidth / this.CARD_WIDTH));
    this.marketplaceService.getAllProducts().subscribe((products) => {
      this.allResults = products;
      this.loading = false;
      this.items = this.allResults.slice(0, this.LOAD_BUFFER);
      this.cdr.detectChanges();
    });
  }

  loadMore() {
    this.items = this.allResults.slice(0, this.items.length + this.LOAD_BUFFER);
  }

  filterProducts(filter) {
    if (filter) {

    } else {

    }
  }
}
