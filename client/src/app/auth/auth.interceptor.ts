import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { AuthQuery } from './state/auth.query';
import { Observable } from 'rxjs';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  constructor(private authQuery: AuthQuery) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const updateRequest: { [key: string]: any } = {
      withCredentials: true
    };

    if (this.authQuery.isLoggedIn()) {
      updateRequest.setHeaders = {
        authorization: `bearer ${this.authQuery.getToken()}`
      };
    }

    const newRequest = req.clone(updateRequest);

    return next.handle(newRequest);
  }
}
