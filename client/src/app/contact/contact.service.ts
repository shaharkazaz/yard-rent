import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { URI_CONSTANTS } from '../shared/constants/uri.contants';
import { parseUrl } from '../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private http: HttpClient) {}

  getAllShops() {
    return this.http.get<any>(parseUrl(URI_CONSTANTS.shops.getAll));
  }
}
