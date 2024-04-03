import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";
import {User} from "../model/user.model";
import {AppConstants} from "../constants/app.constants";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  validateLoginDetails(user: User) {
    window.sessionStorage.setItem("userdetails",JSON.stringify(user));
    return this.http.get(environment.rootUrl + AppConstants.LOGIN_API_URL, { observe: 'response',withCredentials: true });
  }
}
