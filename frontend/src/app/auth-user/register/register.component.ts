import {Component, OnInit} from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../api/services/authentication.service";
import {User} from "../../model/user.model";
import {flush} from "@angular/core/testing";
import {AppConstants} from "../../constants/app.constants";
import {RegisterRequest} from "../../api/models/register-request";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit{
  options = AppConstants.ROLES;
  showModal: boolean = false;
  alertTitle: string = 'Register';
  alertMessage: string = 'Please wait! Registering your account.';
  alertColor: string = 'blue';
  request: RegisterRequest = {email: '', firstName: '', lastName: '', password: ''};

  constructor(private authenticationService: AuthenticationService,private cookieService: CookieService,private router: Router) {}

  ngOnInit(): void {
    this.cookieService.delete('email_register');
  }

  handleAlertOpen(showModal: boolean = false,alertTitle: string = '', alertMessage: string = '', alertColor: string = 'red'){
    this.showModal = showModal;
    this.alertTitle = alertTitle;
    this.alertMessage = alertMessage;
    this.alertColor = alertColor;
  }


  firstname= new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
  lastname = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)]);
  confirmPassword = new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)]);

  registerForm: FormGroup = new FormGroup({
    firstname: this.firstname,
    lastname: this.lastname,
    email: this.email,
    password: this.password,
    confirmPassword: this.confirmPassword
  });

  clearForm(): void {
    this.registerForm.reset();
  }

  register(): boolean | void {
    const {firstname, lastname, email, password, confirmPassword, role} = this.registerForm.value;
    if (password !== confirmPassword){
      this.handleAlertOpen(true,'Password Mismatch','Passwords do not match! Please try again.','red');


      setTimeout(() => {
        this.showModal = false;
      }, 5000);
    } else if (this.registerForm.invalid) {
      this.handleAlertOpen(true, 'Invalid Form', 'Please fill out the form correctly.', 'red');

      setTimeout(() => {
        this.showModal = false;
      }, 5000);
    }
    else {
      console.log('Registering user...');
      this.request = {
        email: email,
        firstName: firstname,
        lastName: lastname,
        password: password
      }

      this.authenticationService
        .register({
          body: this.request
        })
        .subscribe(
        responseData => {
          this.handleAlertOpen(true,'Registration Successful','Congrats ! to start using the system activate your account.','green');
          // persist user data to cookie
          this.cookieService.set('email_register', email);

          setTimeout(() => {
            this.showModal = false;
            this.router.navigate(['activate-account']);
          }, 5000);
        }, error => {
          console.log(error);
          this.handleAlertOpen(true,'Registration Failed !' + error ,'Your account could not be registered. Please try again.','red');
          this.clearForm();
        });


    }

  }
}
