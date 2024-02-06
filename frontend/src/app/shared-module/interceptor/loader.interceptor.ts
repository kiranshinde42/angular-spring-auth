import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, finalize } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loader: LoaderService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loader.showLoader();
    return next.handle(request).pipe(
      finalize(() => this.loader.hideLoader()),
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          this.loader.hideLoader();
        }
        return new Observable<HttpEvent<any>>();
      })
    );
  }
}
