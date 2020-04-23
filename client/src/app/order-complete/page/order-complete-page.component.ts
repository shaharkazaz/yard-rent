import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, OnDestroy, OnInit,
  ViewChild
} from '@angular/core';
import * as confetti from 'canvas-confetti';
import {ActivatedRoute, Router} from "@angular/router";
import {TwitterService} from "../../shared/services/twitter.service";

@Component({
  selector: 'app-order-complete',
  templateUrl: './order-complete-page.component.html',
  styleUrls: ['./order-complete-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderCompletePageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('loader', {static: false, read: ElementRef}) loader;
  orderId: string;
  loading = false;
  tweeted = false;
  private redirection;

  constructor(private route: ActivatedRoute, private router: Router,private twitterService: TwitterService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    const {orderId} = this.route.snapshot.data;
    if (orderId) {
      this.orderId = `#${orderId}`;
    }
  }

  ngAfterViewInit() {
    this.initConfetti();
  }

  ngOnDestroy() {
    clearTimeout(this.redirection);
  }

  postTwitt() {
    this.loading = true;
    const data = {orderId: this.orderId, products: this.route.snapshot.data.orderDetails.products.length};
    this.twitterService.twittOrder(data).subscribe(() => {
      this.tweeted = true;
      this.loader.nativeElement.classList.add('load-complete');
      this.cdr.detectChanges();
      this.redirection = setTimeout(() => this.router.navigate(['']), 1000);
    });
  }

  private initConfetti() {
    const angles = [{angle: 45, x: 0.1}, {angle: 135, x: 0.9}];
    angles.forEach(({angle, x}) => {
      confetti.default({
        angle,
        particleCount: 100,
        spread: 70,
        origin: {y: 0.8, x}
      });
    });
  }
}
