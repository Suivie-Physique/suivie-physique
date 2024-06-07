import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService {

  constructor() { }

  set token(token: string) {
    localStorage.setItem('refresh_token', token);
  }

  get token() {
    return localStorage.getItem('refresh_token') as string;
  }

  removeToken(): void {
    localStorage.removeItem('refresh_token');
  }

  isTokenExist(): boolean {
    return !!this.token;
  }


}
