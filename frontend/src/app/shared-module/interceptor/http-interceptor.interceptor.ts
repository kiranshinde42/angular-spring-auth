import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { SnackBarService } from '../services/snack-bar.service';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private loader: LoaderService,
    private snackBarService: SnackBarService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const authToken = JSON.parse(localStorage.getItem('user')).token;
    if (authToken) {
      // Clone the request and attach the token
      const authReq = request.clone({
        headers: request.headers.append('Authorization', `Bearer ${authToken}`),
      });

      return next.handle(authReq).pipe(
        catchError((err) => {
          if (err instanceof HttpErrorResponse) {
            this.loader.hideLoader();
            if (err.status === 403) {
              this.snackBarService.openSnackBar(
                err.error?.access_denied_reason
              );
              this.router.navigate(['/']);
            }
          }
          return new Observable<HttpEvent<any>>();
        })
      );
    } else {
      // If there is no token, pass the original request
      return next.handle(request).pipe(
        catchError((err) => {
          this.loader.hideLoader();
          if (err instanceof HttpErrorResponse) {
            if (err.status === 403) {
              console.log('this should print your error!', err.error);
            }
          }
          return new Observable<HttpEvent<any>>();
        })
      );
    }
  }
}
