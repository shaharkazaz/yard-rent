import { Component, OnInit } from '@angular/core';
import { PollutionIndicatorService  } from '../../state/pollution-indicator.service';
import {Observable} from 'rxjs';

@Component({
  providers: [PollutionIndicatorService],
  selector: 'app-pollution-indicator',
  templateUrl: './pollution-indicator.component.html',
  styleUrls: ['./pollution-indicator.component.scss']
})
export class PollutionIndicatorComponent implements OnInit {
  airPollution: Observable<number>;
  color = '#DFEC12';

  constructor(private pollutionIndicatorService: PollutionIndicatorService) { }

  ngOnInit() {
    this.airPollution = this.pollutionIndicatorService.getAirPollution();
    this.airPollution
      .subscribe(data => {
        if(data >= 0 && data <= 50)
        {
          this.color = '#21EC12'
        }else if (data > 50 && data <= 100) {
          this.color = '#DFEC12'
        }else {
          this.color = '#F11C12'
        }
      })
  }

}
