import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL: string = 'https://baas.kinvey.com/';
const APP_KEY: string = '/kid_B1R1z3uSX/';
const GENERATE_URL = (endPoint: string, currentModule: string) =>
  BASE_URL + currentModule + APP_KEY + endPoint;

@Injectable({
  providedIn: 'root'
})
export class HttpServices {
  constructor(private http: HttpClient) {}

  get<T>(endPoint: string, currentModule: string): Observable<Object> {
    return this.http.get(GENERATE_URL(endPoint, currentModule));
  }

  post<T>(
    body: T,
    endPoint: string,
    currentModule: string
  ): Observable<Object> {
    return this.http.post(GENERATE_URL(endPoint, currentModule), body);
  }

  put<T>(
    body: T,
    endPoint: string,
    currentModule: string
  ): Observable<Object> {
    return this.http.put(GENERATE_URL(endPoint, currentModule), body);
  }

  delete<T>(
    endPoint: string,
    currentModule: string
  ): Observable<Object> {
    return this.http.delete(GENERATE_URL(endPoint, currentModule));
  }
}
