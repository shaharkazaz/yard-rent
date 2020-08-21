import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { URI_CONSTANTS } from '@yr/shared/constants/uri.contants';
import { parseUrl } from '@yr/shared/utils';

@Injectable()
export class ReturnProductService {
  constructor(private http: HttpClient) {}

  setProductReturnStatus(product, isApproved, message) {
    return this.http.post<void>(
      parseUrl(URI_CONSTANTS.messages.updateReturnStatus),
      { product, isApproved, message }
    );
  }
}
