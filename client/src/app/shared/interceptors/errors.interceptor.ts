import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatoSnackbar } from '@datorama/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AppInitService } from '@yr/app-init.service';
import { AuthService } from '@yr/auth/state/auth.service';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private snackbar: DatoSnackbar,
    private appInitService: AppInitService
  ) {}
  /**
   * Intercept all http calls
   **/
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request.clone(request)).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        if (errorResponse instanceof HttpErrorResponse) {
          switch (errorResponse.status) {
            case 401:
              this.authService.logout();
              this.appInitService.appInitiated() &&
                this.snackbar.error('session-expired');
              break;
            case 409:
              break;
            default:
              this.snackbar.error('something-went-wrong');
          }

          return throwError(errorResponse);
        }
      })
    );
  }
}
