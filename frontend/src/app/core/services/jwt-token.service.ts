import { Injectable } from '@angular/core';
import { JwtHelperService  } from '@auth0/angular-jwt';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {

  constructor() { }

  set token(token: string) {
    localStorage.setItem('token', token);
  }

  get token() {
    return localStorage.getItem('token') as string;
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  isTokenExist(): boolean {
    return !!this.token;
  }

  getPayload(): any {
    return JwtHelperService.prototype.decodeToken(this.token);
  }

  getActiveUser(): User {
    const data = Object.entries(this.getPayload()).map(([key, value]) => value);
    let [fullName, email, iat, exp, authorities]: Array<string|Array<string>|undefined> = [...data] as Array<string|undefined>;
    let activeUser = new User(undefined, fullName, email, undefined, authorities?.[0], undefined, undefined, undefined);

    return activeUser;
  }


}
