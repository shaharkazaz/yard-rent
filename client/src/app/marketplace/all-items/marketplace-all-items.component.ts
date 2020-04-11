import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MarketplaceService } from '../state/marketplace.service';
import { Observable } from 'rxjs';
import {Product} from "../marketplace.types";

@Component({
  selector: 'app-marketplace-all-items',
  templateUrl: './marketplace-all-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./marketplace-all-items.component.scss']
})
export class MarketplaceAllItemsComponent implements OnInit {
  items: Observable<Product[]>;

  constructor(private marketplaceService: MarketplaceService) {}

  ngOnInit() {
    this.items = this.marketplaceService.getAllProducts();
  }
}
