import {ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {combineLatest, Subject} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent implements OnInit {
  gettingStartedMenuItems = [
    'how-to-rent',
    'how-to-post',
    'what-are-rewards'
  ];
  viewInit = new Subject<HTMLElement>();
  @ViewChild('gettingStartedBtn', {static: false, read: ElementRef}) set gettingStartedTab(element: ElementRef) {
    element && this.viewInit.next(element.nativeElement);
  }
  constructor(private router: Router,) { }

  ngOnInit() {
    combineLatest([this.router.events, this.viewInit.asObservable()])
      .subscribe(([event, btn]) => {
        if (event instanceof NavigationEnd) {
          const addClass = event.url.includes('getting-started');
          addClass ? btn.classList.add('active-page') : btn.classList.remove('active-page');
        }
      });
  }

}
