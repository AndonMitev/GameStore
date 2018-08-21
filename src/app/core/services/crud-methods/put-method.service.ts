import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GENERATE_BASE_URL } from './base-url.service';

@Injectable({
  providedIn: 'root'
})
export class PutMethod {
  constructor(private http: HttpClient) {}

  put<T>(body: T, endPoint: string, currentModule: string): Observable<Object> {
    return this.http.put(GENERATE_BASE_URL(endPoint, currentModule), body);
  }
}
