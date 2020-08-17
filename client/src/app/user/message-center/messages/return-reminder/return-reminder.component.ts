import { Component, Input } from '@angular/core';
import { ClientMessage } from '../../message-center.types';
import { MarketplaceService } from '@yr/marketplace/state/marketplace.service';
import { Product } from '@yr/marketplace/marketplace.types';
import { Observable } from 'rxjs';

@Component({
  selector: 'return-reminder-message',
  templateUrl: './return-reminder.component.html',
  styleUrls: ['./return-reminder.component.scss']
})
export class ReturnReminderComponent {
  @Input() set message(message: ClientMessage) {
    this.product$ = this.marketplaceService.getProduct(message.productToReturn);
  }
  product$: Observable<Product>;

  constructor(private marketplaceService: MarketplaceService) {}
}
