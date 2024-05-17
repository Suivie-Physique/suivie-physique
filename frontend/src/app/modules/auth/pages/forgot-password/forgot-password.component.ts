import {Component, Input, OnInit, Output} from '@angular/core';
import {AuthenticationService} from "../../../../api/services/authentication.service";
import {Router} from "@angular/router";
import { RouterModule } from '@angular/router';
import {CookieService} from "ngx-cookie-service";
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import { SharedModule } from '../../../../shared/shared.module';
import {CodeInputModule} from "angular-code-input";
import { UsersControllerService } from 'app/api/services';

import {FormControl, FormGroup} from "@angular/forms";
import { ResetPasswordRequest } from 'app/api/models';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, SharedModule, CodeInputModule, RouterModule],
  providers: [AuthenticationService, CookieService, UsersControllerService]
})
export class ForgotPasswordComponent implements OnInit{
    alertTitle: string = 'Account Activation';
    alertMessage: string = 'Account activated successfully';
    alertColor: string = 'sky';
    showModal: boolean = false;

    forgotPasswordControls = {
        email: new FormControl('', [Validators.required, Validators.email]),
    }
    forgotPasswordForm = new FormGroup({
        email: this.forgotPasswordControls.email,
    });

    resetPasswordControls = {
        email: new FormControl('', [Validators.required, Validators.email]),
        newPassword: new FormControl('', [Validators.required,  Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)]),
        token: new FormControl('', [Validators.required])
    }
    resetPasswordForm = new FormGroup({
        email: this.resetPasswordControls.email,
        newPassword: this.resetPasswordControls.newPassword,
        token: this.resetPasswordControls.token
    });


    constructor(private usersControllerService: UsersControllerService, private authenticationService: AuthenticationService, private router: Router) {}
    ngOnInit(): void {}

    handleAlertOpen(showModal: boolean = false,alertTitle: string = '', alertMessage: string = '', alertColor: string = 'red'){
        this.showModal = showModal;
        this.alertTitle = alertTitle;
        this.alertMessage = alertMessage;
        this.alertColor = alertColor;
      }

    sendResetToken(){
        this.authenticationService
        .forgotPassword({
            email: this.forgotPasswordForm.value.email!
        })
        .subscribe(
            {
                next: (response) => {
                    this.handleAlertOpen(true, 'Reset Password', 'Reset token sent successfully..', 'sky');
                    this.forgotPasswordForm.reset();
                    setTimeout(() => {
                        this.showModal = false;
                    }, 3000);
                },
                error: (error) => {
                    this.handleAlertOpen(true, 'Reset Password', 'Failed to send reset token..', 'red');
                    console.log(error.error);
                }
            }
        )
    }

    resetPassword(){
        let request: ResetPasswordRequest = {
            email: this.resetPasswordForm.value.email!,
            newPassword: this.resetPasswordForm.value.newPassword!,
            token: this.resetPasswordForm.value.token!
        } 
    
       this.authenticationService
       .resetPassword({body: request})
       .subscribe({
              next: (response) => {
            
                this.handleAlertOpen(true, 'Reset Password', 'Password reset successfully..', 'sky');
                this.resetPasswordForm.reset();
                setTimeout(() => {
                    this.router.navigate(['/auth/authenticate']);
                }, 2500);
              },
              error: (error) => {
                this.handleAlertOpen(true, 'Reset Password', 'Failed to reset password..', 'red');
                console.log(error.error);
              }
       })
    }

}