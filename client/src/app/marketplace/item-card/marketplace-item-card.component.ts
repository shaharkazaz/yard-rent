import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Product} from "../marketplace.types";
import {formatNumber} from '../../shared/utils';
import {formatToKebab} from "../../shared/utils";


@Component({
  selector: 'marketplace-item-card',
  templateUrl: './marketplace-item-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./marketplace-item-card.component.scss']
})
export class MarketplaceItemCardComponent {
  @Input() item: Product;

  formatNumber(rewards: number) {
    return formatNumber(rewards);
  }

  formatToKebab(str: string): string{
    console.log(formatToKebab(str));
    return formatToKebab(str);
  }
}
