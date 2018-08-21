import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//Service
import { HttpServices } from '../http.services';
//State
import { AppState } from '../../../store/app.state';
//Model
import { RegisterInputModel } from '../../models/input-models/register.model';
//Action
import { GetUserById } from '../../../store/actions/user.actions';

@Injectable({
  providedIn: 'root'
})
export class GetProfileService {
  constructor(private http: HttpServices, private store: Store<AppState>) {}

  public getProfile(userId: string): Observable<void> {
    return this.http.get<RegisterInputModel>(userId, 'user').pipe(
      map((res: RegisterInputModel) => {
        this.store.dispatch(new GetUserById(res));
      })
    );
  }
}
