import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GENERATE_BASE_URL } from './base-url.service';

@Injectable({
  providedIn: 'root'
})
export class PostMethod {
  constructor(private http: HttpClient) {}

  post<T>(
    body: T,
    endPoint: string,
    currentModule: string
  ): Observable<Object> {
    return this.http.post(GENERATE_BASE_URL(endPoint, currentModule), body);
  }
}
