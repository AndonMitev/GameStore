import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GENERATE_BASE_URL } from './base-url.service';

@Injectable({
  providedIn: 'root'
})
export class DeleteMethod {
  constructor(private http: HttpClient) {}

  delete<T>(endPoint: string, currentModule: string): Observable<Object> {
    return this.http.delete(GENERATE_BASE_URL(endPoint, currentModule));
  }
}
