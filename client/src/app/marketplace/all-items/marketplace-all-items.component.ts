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

  constructor(private marketplaceService: MarketplaceService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.marketplaceService.getAllProducts().subscribe((products) => {
      this.loading = false;
      this.items = products;
      this.cdr.detectChanges();
    });
  }
}
