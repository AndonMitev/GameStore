import { Injectable } from '@angular/core';
import { HttpServices } from '../http.services';
import { Store } from '../../../../../node_modules/@ngrx/store';
import { AppState } from '../../../store/app.state';
import { map } from '../../../../../node_modules/rxjs/operators';
import { GetUserByUsername } from '../../../store/actions/user.actions';
import { RegisterInputModel } from '../../models/input-models/register.model';

@Injectable({
  providedIn: 'root'
})
export class GetUserIdByUsernameService {
  constructor(private http: HttpServices, private store: Store<AppState>) {}

  getUserIdByUsername(username: string) {
    return this.http.get(`?query={"username":"${username}"}`, 'user');
  }
}
