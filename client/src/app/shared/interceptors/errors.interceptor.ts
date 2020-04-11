import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {DatoSnackbar} from "@datorama/core";
import {AuthService} from "../../auth/state/auth.service";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private snackbar: DatoSnackbar) {}
  /**
   * Intercept all http calls
   **/
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request.clone(request)).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        if (errorResponse instanceof HttpErrorResponse) {
          if (errorResponse.status === 401) {
            this.authService.logout();
            this.snackbar.error('session-expired');
          } else {
            this.snackbar.error('something-went-wrong');
          }
          return throwError(errorResponse);
        }
      })
    );
  }
}
