import {Component, OnInit} from '@angular/core';
import {User} from "../../model/user.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  user = new User();

  constructor() {

  }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('userdetails') || '{}');
  }

}

