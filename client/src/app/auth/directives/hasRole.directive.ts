import {ChangeDetectorRef, Directive, Input, OnDestroy, TemplateRef, ViewContainerRef} from '@angular/core';
import { AuthQuery } from '../state/auth.query';
import { USER_ROLES, UserRole } from '../auth.types';
import {Subscription} from "rxjs";

@Directive({ selector: '[hasRole]' })
export class HasRoleDirective implements OnDestroy {
  private role: UserRole;
  private subscription: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private authQuery: AuthQuery,
    private cdr: ChangeDetectorRef
  ) {}

  @Input()
  set hasRole(minRole: UserRole) {
    if (this.role !== minRole) {
      this.role = minRole;
      this.subscription && this.subscription.unsubscribe();
      this.subscription = this.authQuery.selectUserRole().subscribe(role => {
          if (USER_ROLES[role] >= USER_ROLES[this.role]) {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
            this.cdr.detectChanges();
          } else {
            this.viewContainerRef.clear();
          }
      });
    }
  }

  ngOnDestroy(): void {}
}
