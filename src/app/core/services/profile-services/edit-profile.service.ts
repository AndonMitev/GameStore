import { Injectable } from '@angular/core';

//CRUD Method
import { PutMethod } from '../crud-methods/put-method.service';
import { PostMethod } from '../crud-methods/post-method.service';
import { RegisterInputModel } from '../../models/input-models/register.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { GetUserByIdAction } from '../../../store/actions/user.actions';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EditUserProfileService {
  constructor(
    private method: PutMethod,
    private http: PostMethod,
    private store: Store<AppState>
  ) {}

  public editUserProfile(userProfile: Object, userId: string) {
    return this.method.put<Object>(userProfile, userId, 'user').pipe(
      map((res: RegisterInputModel) => {
        this.store.dispatch(new GetUserByIdAction(res));
      })
    );
  }

  public checkIfUsernameExists(userData: Object): Observable<Object> {
    return this.http.post<Object>(userData, 'check-username-exists', 'rpc');
  }
}
