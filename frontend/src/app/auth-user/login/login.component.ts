import {Component, OnInit} from '@angular/core';
import {User} from "../../model/user.model";
import {AuthenticationService} from "../../api/services/authentication.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, FormsModule, NgForm, Validators} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
// @ts-ignore
import {AuthenticationRequest} from "../../api/services/authentication-request";
import {AuthenticationResponse} from "../../api/models/authentication-response";
import {JwtTokenService} from "../../services/jwt-token.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)]);
  // authStatus: string;
  model = new User();
  // authenticationRequest: AuthenticationRequest;
  request: AuthenticationRequest = {
    email: '',
    password: ''
  };

  // Alert Modal
  showModal: boolean = false;
  alertTitle: string = 'Login';
  alertMessage: string = 'Please wait! Logging in.';
  alertColor: string = 'blue';





  constructor(private authenticationService: AuthenticationService ,private tokenService: JwtTokenService ,private router: Router) {}

  ngOnInit(): void {}

  handleAlertOpen(showModal: boolean = false,alertTitle: string = '', alertMessage: string = '', alertColor: string = 'red'){
    this.showModal = showModal;
    this.alertTitle = alertTitle;
    this.alertMessage = alertMessage;
    this.alertColor = alertColor;
  }


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
  clearForm(): void {
    this.loginForm.reset();
  }

  validateUser() {
    console.log(this.model);
    console.log("inside Validate User");
    this.request = {
      email: this.model.email,
      password: this.model.password
    }

    this.authenticationService.authenticate({
      body: this.request
    }).subscribe({
      next: (responseData: AuthenticationResponse) => {
        // Set Local Storage to Authorization Jwt Token
        this.tokenService.token =  responseData.token as string;
          this.router.navigate(['dashboard']);
      },
      error: (error) => {
        this.handleAlertOpen(true,'Invalid Credentials','Invalid email or password! Please try again.','red');
        console.log(error);
        console.log(error.message);
        this.clearForm();
      }
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

