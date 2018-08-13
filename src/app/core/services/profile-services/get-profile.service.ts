import { Injectable } from '@angular/core';
import { HttpServices } from '../http.services';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { GetUser } from '../../../store/actions/user.actions';
import { RegisterInputModel } from '../../models/input-models/register.model';

@Injectable({
  providedIn: 'root'
})
export class GetProfileService {
  constructor(private http: HttpServices, private store: Store<AppState>) {}

  getProfile(userId) {
    return this.http.get(userId, 'user').pipe(
      map((res: RegisterInputModel) => {
        this.store.dispatch(new GetUser(res));
      })
    );
  }
}
