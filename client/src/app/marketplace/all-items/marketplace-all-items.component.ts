import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MarketplaceService} from '../state/marketplace.service';
import {Product} from "../marketplace.types";
import {ActivatedRoute} from "@angular/router";
import {untilDestroyed} from "ngx-take-until-destroy";
import { CARD_WIDTH } from '../item-card/item-card-loader/item-card-loader.component';

@Component({
  selector: 'app-marketplace-all-items',
  templateUrl: './marketplace-all-items.component.html',
  styleUrls: ['./marketplace-all-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketplaceAllItemsComponent implements OnInit, OnDestroy {
  items: Product[];
  loading = true;
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  loadersCount: any[];
  private readonly LOAD_BUFFER = 20;
  private buffer = this.LOAD_BUFFER;

  constructor(private marketplaceService: MarketplaceService, private cdr: ChangeDetectorRef, private route: ActivatedRoute) {}

  ngOnInit() {
    this.loadersCount = new Array(Math.floor(document.documentElement.clientWidth / CARD_WIDTH));
    this.route.queryParams.pipe(untilDestroyed(this)).subscribe((filter) => {
      const parsedFilter = Object.entries(filter).reduce((parsed, [prop, rawVal]) => {
        let value = rawVal;
        if (/(min|max)Rewards/.test(prop)) {
          value = +value;
        }
        parsed[prop] = value;
        return parsed;
      }, {});
      this.filterProducts(parsedFilter);
    });
  }

  ngOnDestroy(): void {}

  loadMore() {
    this.buffer += this.LOAD_BUFFER;
    this.items = this.filteredProducts.slice(0, this.buffer);
  }

  filterProducts(filter) {
    if (filter || !this.allProducts) {
      this.loadProducts(filter);
    } else {
      this.filteredProducts = this.allProducts;
      this.items = this.allProducts.slice(0, this.buffer);
    }
    this.buffer = this.LOAD_BUFFER;
  }

  private loadProducts(filter?) {
    this.loading = true;
    this.marketplaceService.getAllProducts(filter).pipe(untilDestroyed(this)).subscribe((products) => {
      !filter && (this.allProducts = products);
      this.filteredProducts = products;
      this.loading = false;
      this.items = this.filteredProducts.slice(0, this.buffer);
      this.cdr.detectChanges();
    });
  }
}

