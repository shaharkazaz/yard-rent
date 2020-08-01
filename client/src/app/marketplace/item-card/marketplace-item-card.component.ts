import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '../marketplace.types';
import { formatNumber, formatToKebab } from '../../shared/utils';

@Component({
  selector: 'marketplace-item-card',
  templateUrl: './marketplace-item-card.component.html',
  styleUrls: ['./marketplace-item-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketplaceItemCardComponent {
  @Input() item: Product;
  @Input() readonly: boolean;

  formatNumber(rewards: number) {
    return formatNumber(rewards);
  }

  formatToKebab(str: string): string {
    return formatToKebab(str);
  }
}
