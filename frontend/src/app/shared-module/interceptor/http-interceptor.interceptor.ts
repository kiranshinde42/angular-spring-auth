import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {
  constructor() {}

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

      return next.handle(authReq);
    }

    // If there is no token, pass the original request
    return next.handle(request);
  }
}
