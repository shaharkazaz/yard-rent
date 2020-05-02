import {Component, ElementRef, ViewChild} from '@angular/core';
import {BingMapService} from "./bing-map.service";

@Component({
  selector: 'bing-map',
  templateUrl: './bing-map.component.html',
  styleUrls: ['./bing-map.component.scss']
})
export class BingMapComponent {

  @ViewChild('map', {static: true}) streetsideMapViewChild: ElementRef;

  streetsideMap: Microsoft.Maps.Map;

  constructor(private bingMapService: BingMapService) {}

  ngAfterViewInit() {
   this.bingMapService.loadScript().then(() => {
      this.createStreetSideMap();
      this.bingMapService.getAllShops().subscribe((shops) => {
        for (const shop of shops) {
          const location = new Microsoft.Maps.Location(shop.coordinates.lat, shop.coordinates.long);
          const pin = new Microsoft.Maps.Pushpin(location, {'draggable': false, 'enableHoverStyle': true,
            title: shop.address, subTitle: shop.city});
          this.streetsideMap.entities.push(pin);
        }
      });
    });
  }

  private createStreetSideMap() {
    this.streetsideMap = new Microsoft.Maps.Map(
      this.streetsideMapViewChild.nativeElement,
      {
        credentials: 'AkDnTh-F1E565FfNPYCHbjs4JRMN6fC43_WivOhXMja2MVEFmDJhO2ZY8r_MuX54',
        mapTypeId: Microsoft.Maps.MapTypeId.streetside,
        streetsideOptions: {
          overviewMapMode: Microsoft.Maps.OverviewMapMode.hidden,
          showExitButton: false
        }
      }
    );
  }
}
