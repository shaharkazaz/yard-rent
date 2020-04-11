import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MarketplaceService} from "../state/marketplace.service";
import {Observable, of} from "rxjs";
import {Product} from "../marketplace.types";

@Component({
  selector: 'marketplace-item-page',
  templateUrl: './marketplace-item-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./marketplace-item-page.component.scss']
})
export class MarketplaceItemPageComponent implements OnInit {
  product$: Observable<any>;
  constructor(private marketplaceService: MarketplaceService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.product$ = of({ "isDeleted": false, "name": "chen amiel", "user": { "name": "chen" }, "category": { "name": "furnitures" }, "subCategory": { "subCategoryName": "table" }, "rewards": 100, "address": "Mendel 5ewqe", "deposit": 3, "durationInDays": "1970-01-02T03:23:57.051Z", "description": "jasifajfioasjhaoijiofjaiofjafoafjasijaofa", "image": "https://storage.googleapis.com/yard-rent.appspot.com/4ekv5sk7q6s882.jpg", "__v": 0 })//this.marketplaceService.getProduct(this.route.snapshot.params.id);
  }

  addItemToCart() {

  }
}
