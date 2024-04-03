import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../../services/dashboard.service";
import {User} from "../../model/user.model";

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html'
})
export class LoansComponent implements OnInit {

  user = new User();
  loans = new Array();
  currOutstandingBalance:number = 0;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('userdetails') || '{}');
    if(this.user){
      this.dashboardService.getLoansDetails(this.user).subscribe(
        responseData => {
          this.loans = <any> responseData.body;
          this.loans.forEach(function (loan: any) {
            // @ts-ignore
            this.currOutstandingBalance = this.currOutstandingBalance+loan.outstandingAmount;
          }.bind(this));
        }, error => {
          console.log(error);
        });
    }
  }



}
