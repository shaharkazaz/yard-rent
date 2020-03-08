import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthQuery } from '../state/auth.query';
import { USER_ROLES, UserRole } from '../auth.types';

@Directive({ selector: '[hasRole]' })
export class HasRoleDirective {
  private role: UserRole;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private authQuery: AuthQuery
  ) {}

  @Input()
  set hasRole(role: UserRole) {
    if (this.role !== role) {
      this.role = role;
      if (USER_ROLES[this.authQuery.getUserRole()] >= USER_ROLES[role]) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    }
  }
}
