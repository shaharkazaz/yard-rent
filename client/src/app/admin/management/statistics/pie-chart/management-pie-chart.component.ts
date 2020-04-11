import {ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit, Renderer2} from '@angular/core';
import {ManagementQuery} from "../../state/management.query";
import {ManagementService} from "../../state/management.service";
import {isEmpty} from "@datorama/core";
import {of} from "rxjs";
import * as d3 from "d3";
import {OrdersPerCategoryData} from "../../state/management.types";

@Component({
  selector: 'management-pie-chart',
  templateUrl: './management-pie-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./management-pie-chart.component.scss']
})
export class ManagementPieChartComponent implements OnInit {
  loading = true;
  error = false;

  constructor(
    private zone: NgZone,
    private query: ManagementQuery,
    private service: ManagementService,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const cached = this.query.getValue().ordersPerCategory;
    const data = isEmpty(cached) ? this.service.getOrdersPerCategory() : of(cached);
    data.subscribe(data => {
      this.zone.runOutsideAngular(() => {
        this.initBarChart(data);
      });
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  private initBarChart(data: OrdersPerCategoryData) {
    const formatted: {key: string, value: number}[] = data.reduce((acc, {name, count}) => {
      acc.push({key: name, value: count});

      return acc;
    }, []);
    const width = 380, height = 380, margin = 60;
    const radius = Math.min(width, height) / 2 - margin;

    const svg = d3.select("management-pie-chart .pie-container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.name))
      .range(d3.schemeSet2);

    const pie = d3.pie()
      .value((d: any) => d.value);

    const data_ready = pie(formatted as any);

    const arcGenerator = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    svg
      .selectAll('mySlices')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arcGenerator as any)
      .attr('fill', (d: any) => color(d.data.key) as any)
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)

    // Now add the annotation. Use the centroid method to get the best coordinates
    const numberFormat = new Intl.NumberFormat().format;
    svg
      .selectAll('mySlices')
      .data(data_ready)
      .enter()
      .append('text')
      .html((d: any) => `
            <tspan x="0">${numberFormat(d.data.value)}</tspan>
            <tspan x="0" dy="1.2em">${d.data.key}</tspan>
        `)
      .attr("transform", (d: any) => "translate(" + arcGenerator.centroid(d) + ")")
      .style("text-anchor", "middle")
      .style("font-size", 17);
  }
}
