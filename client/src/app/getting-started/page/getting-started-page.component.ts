import {AfterViewInit, Component, ElementRef, OnDestroy} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {untilDestroyed} from "ngx-take-until-destroy";

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started-page.component.html',
  styleUrls: ['./getting-started-page.component.scss']
})
export class GettingStartedPageComponent implements OnDestroy, AfterViewInit {

  sections = ['how-to-post', 'how-to-rent', 'what-are-rewards'];

  constructor(private router: Router, private host: ElementRef) { }

  ngOnDestroy(): void {}

  ngAfterViewInit() {
    this.scrollToHash();
    this.router.events.pipe(untilDestroyed(this)).subscribe(e => {
      if (e instanceof NavigationEnd) {
        setTimeout(() => this.scrollToHash(), 300);
      }
    });
  }


  private scrollToHash() {
    const {hash} = window.location;
    if (hash) {
      const elementId = hash.slice(1);
      const element = document.getElementById(elementId);
      if (element) {
        this.host.nativeElement.scrollTo({ behavior: 'smooth', top: element.offsetTop });
      }
    }
  }
}
