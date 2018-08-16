import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpResponse,
  HttpInterceptor,
  HttpHandler
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { RequestCache } from '../services/request-cache.service';

@Injectable({
  providedIn: 'root'
})
export class CachingInterceptor implements HttpInterceptor {
  constructor(private cache: RequestCache) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.method === 'POST') {
      this.cache.cache.clear();
      return next.handle(req);
    }

    const CACHED_RESPONSE = this.cache.get(req);
    return CACHED_RESPONSE
      ? of(CACHED_RESPONSE)
      : this.sendRequest(req, next, this.cache);
  }

  sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler,
    cache: RequestCache
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(res => {
        if (res instanceof HttpResponse && req.method === 'GET') {
          cache.put(req, res);
        }
      })
    );
  }
}
