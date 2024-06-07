import { Injectable } from '@angular/core';
import { JwtHelperService  } from '@auth0/angular-jwt';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {

  constructor() { }

  set token(token: string) {
    localStorage.setItem('access_token', token);
  }

  get token() {
    return localStorage.getItem('access_token') as string;
  }

  removeToken(): void {
    localStorage.removeItem('access_token');
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
    if (authorities?.length! >= 1) {
      authorities = (authorities as any).filter((role: string) => role.startsWith('ROLE_'));
    }
    let activeRole = authorities?.[0].split('_')[1];
    let activeUser = new User(undefined, fullName, email, undefined, activeRole, undefined, undefined, undefined);

    return activeUser;
  }


}
