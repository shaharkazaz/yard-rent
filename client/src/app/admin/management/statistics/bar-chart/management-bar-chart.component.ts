import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgZone,
  OnInit,
  Renderer2
} from '@angular/core';
import { ManagementService } from '../../state/management.service';
import * as d3 from 'd3';
import { ManagementQuery } from '../../state/management.query';
import { isEmpty } from '@datorama/core';
import { of } from 'rxjs';

@Component({
  selector: 'management-bar-chart',
  templateUrl: './management-bar-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./management-bar-chart.component.scss']
})
export class ManagementBarChartComponent implements OnInit {
  loading = true;
  error = false;
  tooltipEl: HTMLElement;

  constructor(
    private zone: NgZone,
    private query: ManagementQuery,
    private service: ManagementService,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const cached = this.query.getValue().weeklyData;
    const data = isEmpty(cached) ? this.service.getWeeklyData() : of(cached);
    data.subscribe(data => {
      this.zone.runOutsideAngular(() => {
        this.initBarChart(data);
      });
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  private initBarChart(data: any) {
    // set the dimensions and margins of the graph
    const margin = { top: 30, right: 30, bottom: 100, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 450 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3
      .select('.bar-container')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // X axis
    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map(d => d.day))
      .padding(0.2);
    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    // Add Y axis
    const y = d3
      .scaleLinear()
      .domain(d3.extent(data.map(d => d.rewards * 1.2)) as any)
      .range([height, 0]);
    svg.append('g').call(d3.axisLeft(y).tickFormat(d => `${d}$`));

    // Define the div for the tooltip
    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'dato-tooltip graph-tooltip bar-chart-tooltip fixed')
      .style('opacity', 0);

    // Bars
    const that = this;
    this.tooltipEl = this.renderer.selectRootElement('.bar-chart-tooltip');
    const numberFormat = new Intl.NumberFormat().format;
    svg
      .selectAll('mybar')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d: any) => x(d.day))
      .attr('y', (d: any) => y(d.rewards))
      .attr('width', x.bandwidth())
      .attr('height', (d: any) => height - y(d.rewards))
      .attr('fill', '#4b91ce')
      .on('mouseover', function(d: any) {
        const pos = that.renderer
          .selectRootElement(d3.event.target)
          .getBoundingClientRect();
        const tooltipEl = that.renderer.selectRootElement('.bar-chart-tooltip');
        tooltip.style('opacity', 0.9);
        tooltip.html(`
                    <div>Date: ${d.day}</div>
                    <div>Orders made: ${d.orders}</div>
                    <div style="color: green">Total rewards: ${numberFormat(
                      d.rewards
                    )}$</div>
                `);
        tooltip
          .style('left', `${pos.left - tooltipEl.offsetWidth / 2 + 20}px`)
          .style('top', `${pos.top - tooltipEl.offsetHeight - 5}px`);
      })
      .on('mouseout', () => tooltip.style('opacity', 0));
  }
}
