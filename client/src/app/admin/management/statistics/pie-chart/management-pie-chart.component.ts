import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'management-pie-chart',
  templateUrl: './management-pie-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./management-pie-chart.component.scss']
})
export class ManagementPieChartComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
