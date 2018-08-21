import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GENERATE_BASE_URL } from './base-url.service';

@Injectable({
  providedIn: 'root'
})
export class GetMethod {
  constructor(private http: HttpClient) {}

  get<T>(endPoint: string, currentModule: string): Observable<Object> {
    return this.http.get(GENERATE_BASE_URL(endPoint, currentModule));
  }
}