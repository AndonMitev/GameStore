import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { HttpServices } from '../http.services';
import { AppState } from '../../../store/app.state';

@Injectable({
  providedIn: 'root'
})
export class CreateMessageService {
  constructor(private http: HttpServices, private store: Store<AppState>) {}
}
