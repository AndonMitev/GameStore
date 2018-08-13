import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const APP_KEY: string = 'kid_B1R1z3uSX';
const APP_SECRET: string = '4ee849d27a37443fb9f8b4864e642645';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      req.url.endsWith('login') ||
      req.url.endsWith(APP_KEY + '/') ||
      req.url.endsWith('check-username-exists')
    ) {
      req = req.clone({
        setHeaders: {
          Authorization: `Basic ${btoa(`${APP_KEY}:${APP_SECRET}`)}`,
          'Content-Type': 'application/json'
        }
      });
    } else {
      req = req.clone({
        setHeaders: {
          Authorization: `Kinvey ${localStorage.getItem('authtoken')}`,
          'Content-Type': 'application/json'
        }
      });
    }
    return next.handle(req);
  }
}
