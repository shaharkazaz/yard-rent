import {
  ChangeDetectorRef,
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';

import { AuthQuery } from '../state/auth.query';

@Directive({ selector: '[loggedUser]' })
export class IsLoggedInDirective implements OnInit, OnDestroy {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private cdr: ChangeDetectorRef,
    private authQuery: AuthQuery
  ) {}

  @Input() loggedUser: TemplateRef<any>;

  ngOnInit() {
    this.authQuery.isLoggedIn$
      .pipe(untilDestroyed(this))
      .subscribe(isLogged => {
        if (isLogged) {
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainerRef.clear();
        }
      });
  }

  ngOnDestroy() {}
}
