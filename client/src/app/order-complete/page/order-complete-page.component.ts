import {AfterViewInit, ChangeDetectionStrategy, Component} from '@angular/core';
import * as confetti from 'canvas-confetti';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-order-complete',
  templateUrl: './order-complete-page.component.html',
  styleUrls: ['./order-complete-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderCompletePageComponent implements AfterViewInit {
  orderId: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const {orderId} = this.route.snapshot.data;
    if (orderId) {
      this.orderId = `#${orderId}`;
    }
  }

  ngAfterViewInit() {
    this.initConfetti();
  }

  private initConfetti() {
    const angles = [{angle: 45, x: 0.1}, {angle: 135, x: 0.9}];
    angles.forEach(({angle, x}) => {
      confetti.default({
        angle,
        particleCount: 100,
        spread: 70,
        origin: { y: 0.8, x }
      });
    });
  }
}
