import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../../services/dashboard.service";
import {User} from "../../model/user.model";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html'
})
export class CardsComponent implements OnInit {

  user = new User();
  cards = new Array();
  currOutstandingAmt:number = 0;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('userdetails') || '{}' as any);
    if(this.user){
      this.dashboardService.getCardsDetails(this.user).subscribe(
        responseData => {
          this.cards = <any> responseData.body;
          this.cards.forEach(function (card: any) {
            // @ts-ignore
            this.currOutstandingAmt = this.currOutstandingAmt+card.availableAmount;
          }.bind(this));
        }, error => {
          console.log(error);
        });
    }
  }

}
