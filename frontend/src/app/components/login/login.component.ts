import {Component, OnInit} from '@angular/core';
import {User} from "../../model/user.model";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  // authStatus: string;
  model = new User();

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  validateUser(loginForm: NgForm) {
    this.loginService.validateLoginDetails(this.model).subscribe(
      responseData => {
        this.model = <any> responseData.body;
        this.model.authStatus = 'AUTH';
        window.sessionStorage.setItem("userdetails",JSON.stringify(this.model));
        let xsrf = this.getCookie('XSRF-TOKEN');
        window.sessionStorage.setItem("XSRF-TOKEN",xsrf);
        this.router.navigate(['dashboard']);
      }, error => {
        console.log(error);
      });

  }

  getCookie(name: string) {
    let cookie: { [key: string]: string } = {};
    document.cookie.split(';').forEach(function(el) {
      let [k,v] = el.split('=');
      cookie[k.trim()] = v;
    })
    return cookie[name];
  }
}
