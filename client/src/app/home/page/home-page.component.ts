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
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  sections = ['recycle', 'rewards', 'share',];
  carouselConfig: CarouselConfig = {
    loop: true,
    autoRun: true,
    showControls: false,
    animationTiming: '800ms ease',
    itemWidth: 0
  };
  carouselItems = [1, 2, 3];
  searchAnything = new FormControl();
  constructor(private cdr: ChangeDetectorRef, private router: Router) {}

  ngOnInit(): void {
    merge(timer(100), fromEvent(window, 'resize'))
      .pipe(debounceTime(100), untilDestroyed(this))
      .subscribe(() => {
        this.carouselConfig = {
          ...this.carouselConfig,
          itemWidth: document.documentElement.clientWidth - 15
        };
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy() {}

  search() {
    if (!!this.searchAnything.value) {
      this.router.navigate(['marketplace/all-items'], {queryParams: {text: this.searchAnything.value}});
    }
  }
}
