import {Component, Input, OnInit, Output} from '@angular/core';
import {AuthenticationService} from "../../../../api/services/authentication.service";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import { SharedModule } from 'src/app/shared/shared.module';
import {CodeInputModule} from "angular-code-input";


@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, SharedModule, CodeInputModule],
  providers: [CookieService, AuthenticationService]
})
export class ActivateAccountComponent implements OnInit{

 isConfirmed: boolean = false;
 isCompleted: boolean = false;
 isResendDisabled: boolean = false;
 alertTitle: string = 'Account Activation';
 alertMessage: string = 'Account activated successfully';
 alertColor: string = 'sky';
 showModal: boolean = false;

 token: string = '';
 email_register: string = '';

  handleAlertOpen(showModal: boolean = false,alertTitle: string = '', alertMessage: string = '', alertColor: string = 'red'){
    this.showModal = showModal;
    this.alertTitle = alertTitle;
    this.alertMessage = alertMessage;
    this.alertColor = alertColor;
  }

  constructor(
    private authenticationService: AuthenticationService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.email_register = this.cookieService.get('email_register');
  }

  onCodeCompleted(code: string): void {
    this.isCompleted = true;
    this.token = code;
  }

  onConfirm(){
    this.isConfirmed = true;
    this.authenticationService.activateAccount({
      token: this.token
    }).subscribe(
      (response) => {
        this.handleAlertOpen(true, 'Account Activation', 'Account activated successfully', 'sky');

        setTimeout(() => {
          this.router.navigate(['/auth/authenticate']);
        }, 5000);

      },
      (error) => {
        this.handleAlertOpen(true, 'Account Activation', 'Error activating account', 'red');
        console.log('Error activating account: ', error);
      }
    );
  }

  resendCode(){
    console.log('Resending code...');
    this.isResendDisabled = true;
    this.token = '';

    this.authenticationService.resendActivationEmail({
      email: this.email_register
    }).subscribe(
      (response) => {
        this.handleAlertOpen(true, 'Resend Code', 'Code resent successfully', 'sky');

      },
      (error) => {
        this.handleAlertOpen(true, 'Resend Code', 'Error resending code', 'red');
        console.log('Error resending code..  ', error);
      }
    );

    setTimeout(() => {
      this.isResendDisabled = false;
    }, 60000);
  }



}
