import {Component, OnInit} from '@angular/core';
import {User} from "../../model/user.model";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, FormsModule, NgForm, Validators} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)]);
  // authStatus: string;
  model = new User();



  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  loginForm: FormGroup = new FormGroup({
    email: this.email,
    password: this.password
  });

  loginUser(): void {
    const {email, password} = this.loginForm.value;
    this.model.email = email;
    this.model.password = password;

    console.log(this.model);
    this.validateUser();
  }

  validateUser() {
    this.loginService.validateLoginDetails(this.model).subscribe(
      responseData => {
        // Set Session Storage for Authorization Token
        window.sessionStorage.setItem("Authorization",responseData.headers.get("Authorization")!);

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

