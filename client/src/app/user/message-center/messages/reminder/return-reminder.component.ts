import { Component, Input } from '@angular/core';
import { format } from 'date-fns';
import { Observable } from 'rxjs';

import { Product } from '@yr/marketplace/marketplace.types';
import { MarketplaceService } from '@yr/marketplace/state/marketplace.service';
import { stringAsCharSum } from '@yr/shared/utils';

import { ClientMessage } from '../../message-center.types';

@Component({
  selector: 'return-reminder-message',
  templateUrl: './return-reminder.component.html',
  styleUrls: ['./return-reminder.component.scss']
})
export class ReturnReminderComponent {
  @Input() set message(message: ClientMessage) {
    this.orderDetails = {
      date: format(message.order.date, 'MM/DD/YYYY'),
      id: stringAsCharSum(message.order._id)
    };
    this._message = message;
    this.product$ = this.marketplaceService.getProduct(
      message.productToReturn._id
    );
  }
  orderDetails;
  _message: ClientMessage;
  product$: Observable<Product>;

  constructor(private marketplaceService: MarketplaceService) {}
}
