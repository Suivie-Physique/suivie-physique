import {Component, OnInit} from '@angular/core';
import {User} from "../../model/user.model";
import {Account} from "../../model/account.model";
import {DashboardService} from "../../services/dashboard.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {
  user = new User();
  account = new Account();
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('userdetails') || '{}');
    if(this.user){
      this.dashboardService.getAccountDetails(this.user).subscribe(
        responseData => {
          this.account = <any> responseData.body;
        }, error => {
          console.log(error);
        });
    }

  }

}
