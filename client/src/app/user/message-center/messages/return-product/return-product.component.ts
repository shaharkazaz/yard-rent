import { Component, Input } from '@angular/core';
import { format } from 'date-fns';
import { Observable } from 'rxjs';

import { Product } from '@yr/marketplace/marketplace.types';
import { MarketplaceService } from '@yr/marketplace/state/marketplace.service';
import { stringAsCharSum } from '@yr/shared/utils';
import { ClientMessage } from '@yr/user/message-center/message-center.types';

import { ReturnProductService } from './return-product.service';

@Component({
  selector: 'return-product-message',
  templateUrl: './return-product.component.html',
  styleUrls: ['./return-product.component.scss'],
  providers: [ReturnProductService]
})
export class ReturnProductComponent {
  @Input() set message(message: ClientMessage) {
    const { date, _id } = message.order;
    this.orderDetails = {
      date: format(date, 'MM/DD/YYYY'),
      id: stringAsCharSum(_id)
    };
    this._message = message;
    this.renterName = message.productRenter.name;
    this.product$ = this.marketplaceService.getProduct(
      message.productToReturn._id
    );
  }
  orderDetails;
  _message: ClientMessage;
  product$: Observable<Product>;
  returnProcess: Observable<void>;
  renterName: string;
  constructor(
    private marketplaceService: MarketplaceService,
    private returnProductService: ReturnProductService
  ) {}

  applyAction(isApproved: boolean) {
    const { productToReturn, _id } = this._message;
    this.returnProcess = this.returnProductService.setProductReturnStatus(
      productToReturn,
      isApproved,
      _id
    );
  }
}
