import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'bing-map',
  templateUrl: './bing-map.component.html',
  styleUrls: ['./bing-map.component.scss']
})
export class BingMapComponent {

  @ViewChild('map', {static: true}) streetsideMapViewChild: ElementRef;

  streetsideMap: Microsoft.Maps.Map;

  position: Microsoft.Maps.Location;

  log: string[] = [];

  constructor() {
    this.log.push('Constructor');
  }

  ngOnChanges() {
    this.log.push('OnChanges');
  }

  ngAfterViewInit() {
    // TODO move to a service to load only once
    new Promise( resolve => {

      // Set callback for when bing maps is loaded.
      window['__onBingLoaded'] = (ev) => {
        resolve('Bing Maps API loaded');
      };

      // const node = document.createElement('script');
      const node = document.createElement('script');
      node.src = "https://www.bing.com/api/maps/mapcontrol?callback=__onBingLoaded&branch=release";
      node.type = 'text/javascript';
      node.async = true;
      node.defer = true;
      // _documentRef.getElementsByTagName('head')[0].appendChild(node);
      document.getElementsByTagName('head')[0].appendChild(node);
    }).then(() => {
      this.log.push('AfterViewInit');
      this.createStreetSideMap();
      const coords = [41.49871231510167, -72.95581850473526];
      const [lat, lon] = coords;
      this.log.push(`Got coords from service: ${coords}`);
      const position = new Microsoft.Maps.Location(lat, lon);
      this.streetsideMap.setView({ center: position });
      this.log.push(`current Center: ${this.streetsideMap.getCenter()}`);
    });

  }

  createStreetSideMap() {
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
