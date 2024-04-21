import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user.model";
import {environment} from "../environments/environment";
import {AppConstants} from "../constants/app.constants";


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }

  getAccountDetails(user : User){
    return this.http.get(environment.rootUrl + AppConstants.ACCOUNT_API_URL + "?id="+user.id,{ observe: 'response',withCredentials: true });
  }

  getAccountTransactions(user : User){
    return this.http.get(environment.rootUrl + AppConstants.BALANCE_API_URL + "?id="+user.id,{ observe: 'response',withCredentials: true });
  }

  getLoansDetails(user : User){
    return this.http.get(environment.rootUrl + AppConstants.LOANS_API_URL + "?id="+user.id,{ observe: 'response',withCredentials: true });
  }

  getCardsDetails(user : User){
    return this.http.get(environment.rootUrl + AppConstants.CARDS_API_URL + "?id="+user.id,{ observe: 'response',withCredentials: true });
  }

  getNoticeDetails(){
    return this.http.get(environment.rootUrl + AppConstants.NOTICES_API_URL ,{ observe: 'response' });
  }


}
