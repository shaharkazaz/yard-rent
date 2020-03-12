import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {}
