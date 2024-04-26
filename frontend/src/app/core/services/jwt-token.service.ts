import { Injectable } from '@angular/core';

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

}
