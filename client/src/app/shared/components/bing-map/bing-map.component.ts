import { Component, ElementRef, Input, ViewChild } from '@angular/core';

import { BingMapService } from './bing-map.service';

@Component({
  selector: 'bing-map',
  templateUrl: './bing-map.component.html',
  styleUrls: ['./bing-map.component.scss']
})
export class BingMapComponent {
  @Input() addresses: any[];
  @Input() zoom: number;

  @ViewChild('map', { static: true }) streetsideMapViewChild: ElementRef;

  streetsideMap: Microsoft.Maps.Map;

  constructor(private bingMapService: BingMapService) {}

  ngAfterViewInit() {
    this.bingMapService.loadScript().then(() => {
      this.createStreetSideMap();
      for (const address of this.addresses) {
        const location = new Microsoft.Maps.Location(
          address.coordinates.lat,
          address.coordinates.long
        );
        const pin = new Microsoft.Maps.Pushpin(location, {
          draggable: false,
          enableHoverStyle: true,
          title: address.street,
          subTitle: address.city
        });
        this.streetsideMap.entities.push(pin);
      }
    });
  }

  private createStreetSideMap() {
    this.streetsideMap = new Microsoft.Maps.Map(
      this.streetsideMapViewChild.nativeElement,
      {
        credentials:
          'AkDnTh-F1E565FfNPYCHbjs4JRMN6fC43_WivOhXMja2MVEFmDJhO2ZY8r_MuX54',
        mapTypeId: Microsoft.Maps.MapTypeId.streetside,
        center: new Microsoft.Maps.Location(32.0853, 34.7818),
        zoom: this.zoom || 5,
        streetsideOptions: {
          overviewMapMode: Microsoft.Maps.OverviewMapMode.hidden,
          showExitButton: false
        }
      }
    );
  }
}
