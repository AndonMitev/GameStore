import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

const MAX_AGE = 30000;
@Injectable({
  providedIn: 'root'
})
export class RequestCache {
  cache = new Map();

  public get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const URL = req.urlWithParams;
    const CACHED = this.cache.get(URL);

    if (!CACHED) {
      return undefined;
    }

    const isExpired = CACHED.lastRead < Date.now() - MAX_AGE;
    const EXPIRED = isExpired ? 'expired ' : '';
    return CACHED.response;
  }

  public put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    const url = req.url;
    const entry = { url, response, lastRead: Date.now() };

    this.cache.set(url, entry);

    const EXPIRED = Date.now() - MAX_AGE;
    this.cache.forEach(expiredEntry => {
      if (expiredEntry.lastRead < EXPIRED) {
        this.cache.delete(expiredEntry.url);
      }
    });
  }
}
