import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../../services/dashboard.service";

@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html'
})
export class NoticesComponent implements OnInit {


  notices = new Array();

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    this.dashboardService
      .getNoticeDetails()
      .subscribe(
      responseData => {
        this.notices = <any>responseData.body;
        this.notices.forEach(function (card: any) {
          // @ts-ignore
          this.currOutstandingAmt = this.currOutstandingAmt + card.availableAmount;
        }.bind(this));
      }, error => {
        console.log(error);
      });
  }

}
