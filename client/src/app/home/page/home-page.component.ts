import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { CarouselConfig } from '@datorama/core/lib/carousel/carousel.types';
import { fromEvent, merge, timer } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  carouselConfig: CarouselConfig = {
    loop: true,
    autoRun: true,
    showControls: false,
    animationTiming: '800ms ease',
    itemWidth: 0
  };
  carouselItems = [1, 2, 3];
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    document.onload = () => {
      debugger;
    };
    merge(timer(0), fromEvent(window, 'resize'))
      .pipe(debounceTime(100), untilDestroyed(this))
      .subscribe(() => {
        this.carouselConfig = {
          ...this.carouselConfig,
          itemWidth: document.documentElement.clientWidth
        };
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy() {}
}
