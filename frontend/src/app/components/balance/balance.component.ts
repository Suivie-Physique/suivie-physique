import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../../services/dashboard.service";
import {User} from "../../model/user.model";

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html'
})
export class BalanceComponent implements OnInit {

  user = new User();
  transactions = new Array();

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('userdetails') || '{}' as any);
    if(this.user){
      this.dashboardService.getAccountTransactions(this.user)
        .subscribe(
        responseData => {
          this.transactions = <any> responseData.body;
        }, error => {
          console.log(error);
        });
    }
  }

}
