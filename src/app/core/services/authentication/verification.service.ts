import { Injectable } from '@angular/core';

const ADMIN_ID: string = '5b6c375257fa3260bf995d21';
const ADMIN_ROLE_ID: string = '404cf295-d9ee-41fd-a8db-00e8a5a27527';

@Injectable({
  providedIn: 'root'
})
export class UserVerificationService {
  public hasUser(): boolean {
    if (localStorage.getItem('authtoken')) {
      return true;
    }
    return false;
  }

  public isAdmin(): boolean {
    if (localStorage.getItem('roleId')) {
      return true;
    }
    return false;
  }

  public getAdminId(): string {
    return ADMIN_ID;
  }

  public saveUserData(res): void {
    localStorage.setItem('authtoken', res._kmd.authtoken);
    localStorage.setItem('username', res.username);
    localStorage.setItem('userId', res._id);

    if (res['_kmd']['roles']) {
      const ID: string = res['_kmd']['roles'][0].roleId;
      if (ID === ADMIN_ROLE_ID) {
        localStorage.setItem('roleId', ADMIN_ROLE_ID);
      }
    }
  }
}
