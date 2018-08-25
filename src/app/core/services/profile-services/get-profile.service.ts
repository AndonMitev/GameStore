import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//CRUD Method
import { GetMethod } from '../crud-methods/get-method.service';
//State
import { AppState } from '../../../store/app.state';
//Model
import { RegisterInputModel } from '../../models/input-models/register.model';
//Action
import { GetUserByIdAction } from '../../../store/actions/user.actions';

@Injectable({
  providedIn: 'root'
})
export class GetProfileService {
  constructor(private method: GetMethod, private store: Store<AppState>) {}

  public getProfile(userId: string): Observable<void> {
    return this.method.get<RegisterInputModel>(userId, 'user').pipe(
      map((res: RegisterInputModel) => {
        this.store.dispatch(new GetUserByIdAction(res));
      })
    );
  }
}
