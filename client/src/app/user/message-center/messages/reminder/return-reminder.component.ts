import { Component, Input } from '@angular/core';
import { ClientMessage } from '../../message-center.types';
import { MarketplaceService } from '@yr/marketplace/state/marketplace.service';
import { Product } from '@yr/marketplace/marketplace.types';
import { Observable } from 'rxjs';
import { format } from 'date-fns';
import { stringAsCharSum } from '@yr/shared/utils';

@Component({
  selector: 'reminder-message',
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
    this.product$ = this.marketplaceService.getProduct(message.productToReturn);
  }
  orderDetails;
  _message: ClientMessage;
  product$: Observable<Product>;

  constructor(private marketplaceService: MarketplaceService) {}
}
