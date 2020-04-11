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
  position: Microsoft.Maps.Location;

  constructor(private bingMapService: BingMapService) {}

  ngAfterViewInit() {
   this.bingMapService.loadScript().then(() => {
      this.createStreetSideMap();
      const coords = [41.49871231510167, -72.95581850473526];
      const [lat, lon] = coords;
      const position = new Microsoft.Maps.Location(lat, lon);
      this.streetsideMap.setView({ center: position });
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
