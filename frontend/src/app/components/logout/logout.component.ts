import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../../model/user.model";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {

  user = new User();
  constructor(private router : Router) {

  }

  ngOnInit(): void {
    window.sessionStorage.setItem("userdetails",null as any);
    window.sessionStorage.setItem("XSRF-TOKEN",null as any);
    this.router.navigate(['/login']);
  }


}
