import { Injectable } from '@angular/core';

//CRUD Method
import { PutMethod } from '../crud-methods/put-method.service';
import { PostMethod } from '../crud-methods/post-method.service';
import { RegisterInputModel } from '../../models/input-models/register.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditUserProfileService {
  constructor(private put: PutMethod, private post: PostMethod) {}

  public editUserProfile(userProfile: Object, userId: string) {
    return this.put.put(userProfile, userId, 'user');
  }

  public checkIfUsernameExists(userData: Object): Observable<Object> {
    return this.post.post<Object>(userData, 'check-username-exists', 'rpc');
  }
}
