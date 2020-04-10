import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { parseUrl } from '../../shared/utils';
import { URI_CONSTANTS } from '../../shared/constants/uri.contants';

@Injectable()
export class PollutionIndicatorService {
  constructor(private http: HttpClient) {}

  getAirPollution() {
   return this.http.get<number>(parseUrl(URI_CONSTANTS.pollutionIndicator.getAirPollution));
  }
}
