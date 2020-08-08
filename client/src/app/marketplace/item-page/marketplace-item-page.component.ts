import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarketplaceService } from '../state/marketplace.service';
import { Product } from '../marketplace.types';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { finalize } from 'rxjs/operators';
import { formatToKebab } from '../../shared/utils';

@Component({
  selector: 'marketplace-item-page',
  templateUrl: './marketplace-item-page.component.html',
  styleUrls: ['./marketplace-item-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketplaceItemPageComponent implements OnInit, OnDestroy {
  @ViewChild('pageContainer', { static: true })
  private pageContainer: ElementRef;

  product: Product;
  recommendation: Product[];
  private productId: string;
  isInvalidProduct: boolean;

  constructor(
    private cdr: ChangeDetectorRef,
    private marketplaceService: MarketplaceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.pipe(untilDestroyed(this)).subscribe(({ id }) => {
      this.pageContainer.nativeElement.scrollTo({ top: 0, behavior: 'smooth' });
      this.productId = id;
      this.recommendation = null;
      this.product = null;
      this.marketplaceService
        .getProduct(this.productId)
        .pipe(
          finalize(() => this.cdr.detectChanges()),
          untilDestroyed(this)
        )
        .subscribe(
          product => {
            if (product) {
              this.product = product;
            } else {
              this.isInvalidProduct = true;
            }
          },
          () => (this.isInvalidProduct = true)
        );
      this.marketplaceService
        .getProductRecommendation(this.productId)
        .pipe(untilDestroyed(this))
        .subscribe(recommendation => {
          this.recommendation = recommendation;
          this.cdr.detectChanges();
        });
    });
  }

  ngOnDestroy(): void {}

  formatToKebab(str: string): string {
    return formatToKebab(str);
  }
}
