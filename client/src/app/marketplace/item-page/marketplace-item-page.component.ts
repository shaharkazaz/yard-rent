import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MarketplaceService} from "../state/marketplace.service";
import {Product} from "../marketplace.types";

@Component({
  selector: 'marketplace-item-page',
  templateUrl: './marketplace-item-page.component.html',
  styleUrls: ['./marketplace-item-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketplaceItemPageComponent implements OnInit, OnDestroy {
  product: Product;
  recommendation: Product[];
  private productId: string;

  constructor(private cdr: ChangeDetectorRef, private marketplaceService: MarketplaceService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.productId = this.route.snapshot.params.id;
    this.marketplaceService.getProduct(this.productId).subscribe((product) => {
      this.product = product;
      this.cdr.detectChanges();
    });
    this.marketplaceService.getProductRecommendation(this.productId).subscribe((recommendation) => {
      this.recommendation = recommendation;
      this.cdr.detectChanges();
    })
  }

  ngOnDestroy(): void {}
}
