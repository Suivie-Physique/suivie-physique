import {Component, OnInit} from '@angular/core';
import {User} from "../../model/user.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  user = new User();
  constructor() { }

  ngOnInit(): void {
    let userDetails = JSON.parse(sessionStorage.getItem('userdetails') || '{}');
    if (userDetails){
      this.user = JSON.parse(sessionStorage.getItem('userdetails') || '{}');
    }
  }
}
