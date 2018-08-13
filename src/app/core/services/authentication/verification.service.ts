import { Injectable } from '@angular/core';

const ADMIN_ID = '404cf295-d9ee-41fd-a8db-00e8a5a27527';

@Injectable({
  providedIn: 'root'
})
export class UserVerificationService {
  hasUser(): boolean {
    if (localStorage.getItem('authtoken')) {
      return true;
    }
    return false;
  }

  isAdmin(): boolean {
    if (localStorage.getItem('roleId')) {
      return true;
    }
    return false;
  }

  saveUserData(res): void {
    localStorage.setItem('authtoken', res._kmd.authtoken);
    localStorage.setItem('username', res.username);
    localStorage.setItem('userId', res._id);

    if (res['_kmd']['roles']) {
      const ID = res['_kmd']['roles'][0].roleId;
      if (ID === ADMIN_ID) {
        localStorage.setItem('roleId', ADMIN_ID);
      }
    }
  }
}
