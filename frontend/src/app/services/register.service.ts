import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user.model";
import {AppConstants} from "../constants/app.constants";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private http: HttpClient
  ) { }

  registerUser(user: User){
    window.sessionStorage.setItem("userdetails",JSON.stringify(user));
    return this.http.post(environment.rootUrl + AppConstants.REGISTER_API_URL, user, { observe: 'response' });
  }
}
