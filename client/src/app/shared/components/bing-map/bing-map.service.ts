import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URI_CONSTANTS } from '../../../shared/constants/uri.contants';
import { parseUrl } from '../../../shared/utils';

@Injectable({providedIn: 'root'})
export class BingMapService {
  private loaded;
  constructor(private http: HttpClient) {}

  loadScript(): Promise<void> {
    if (!this.loaded) {
      this.loaded = new Promise(resolve => {
        // Set callback for when bing maps is loaded.
        window['__onBingLoaded'] = (ev) => {
          this.loaded = Promise.resolve();
          resolve();
        };

        const node = document.createElement('script');
        node.src = 'https://www.bing.com/api/maps/mapcontrol?callback=__onBingLoaded&branch=release';
        node.type = 'text/javascript';
        node.async = true;
        node.defer = true;
        document.getElementsByTagName('head')[0].appendChild(node);
      });
    }

    return this.loaded;

  }
  getAllShops(){
    return this.http.get<any>(parseUrl(URI_CONSTANTS.shops.getAll));
  }
}
