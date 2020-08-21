import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ClientMessage } from '@yr/user/message-center/message-center.types';
import { URI_CONSTANTS } from '@yr/shared/constants/uri.contants';
import { parseUrl } from '@yr/shared/utils';

@Injectable()
export class ReturnProductService {
  constructor(private http: HttpClient) {}

  setProductReturnStatus(
    product: string,
    isApproved: boolean,
    message: string
  ) {
    return this.http.post<ClientMessage>(
      parseUrl(URI_CONSTANTS.messages.updateReturnStatus),
      { product, isApproved, message }
    );
  }
}
