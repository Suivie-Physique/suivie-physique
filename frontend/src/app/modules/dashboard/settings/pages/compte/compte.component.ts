import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { User } from '../../../../../core/model/user.model';
import { JwtTokenService } from '../../../../../core/services/jwt-token.service';
import { ChangePasswordRequest } from '../../../../../api/models';
import { ChangeEmailRequest } from '../../../../../api/models';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ButtonModule } from 'primeng/button';
import { SharedModule } from '../../../../../shared/shared.module';
import { UsersControllerService } from '../../../../../api/services';
import { Modal } from '../../../../../core/constants/modal';
import { DashboardService } from 'app/core/services/dashboard.service';



@Component({
  selector: 'app-compte',
  standalone: true,
  imports: [CommonModule, ScrollPanelModule ,FormsModule, ReactiveFormsModule, HttpClientModule, SharedModule, ButtonModule],
  templateUrl: './compte.component.html',
  providers: [UsersControllerService]
})
export class CompteComponent implements OnInit {
  isChange: boolean = false;
  loading: boolean = false;
  containerMesures: {[klass: string]: string | any} = {};
  
  activeAccount: User = new User();
  modal: Modal = new Modal();

  newEmail: FormControl = new FormControl('', [Validators.required, Validators.email]);
  oldPassword: FormControl = new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)]);
  newPassword: FormControl = new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)]);
  changePasswordForm: FormGroup = new FormGroup({
    oldPassword: this.oldPassword,
    newPassword: this.newPassword
  });
  changeEmailForm: FormGroup = new FormGroup({
    newEmail: this.newEmail
  });

  requestChangePassword: ChangePasswordRequest = {oldPassword: '', newPassword: '', confirmPassword: ''};
  requestChangeEmail: ChangeEmailRequest = {newEmail: ''};

  
 

  constructor(private usersControllerService: UsersControllerService, private jwtTokenService: JwtTokenService, private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.activeAccount = this.jwtTokenService.getActiveUser();
    this.containerMesures = this.dashboardService.getSettingsPageContainerMesures();
  }

  toggleChangeEmail() {
    this.isChange = !this.isChange;
    this.loading = false;
    this.changeEmailForm.reset();
  }

  //! Changing users email will necessitate a regeneration of the token 
  //! and a reconnection to the application with the new email
  changeEmail(){
    this.loading= true;
    this.requestChangeEmail = {
      newEmail: this.newEmail.value
    };

    // Changing users email
    this.usersControllerService
    .changeEmail({
      body: this.requestChangeEmail
    })
    .subscribe({
      next: (response) => {
        this.loading = false;
        this.modal.handleModal(true,'Email Changed Successfully', 'Email changed successfully !', 'green');
        this.changeEmailForm.reset();
        setTimeout(() => {
          this.modal.showModal = false;
        }, 5000);
      },
      error: (error) => {
        this.loading = false;
        this.modal.handleModal(true,'Email change failed !' ,'Error : ' +  error.error.error, 'red');
        this.changeEmailForm.reset();
        setTimeout(() => {
          this.modal.showModal = false;
        }, 5000);
      
      }
    })

  }

  changePassword() {
    this.loading = true;
    this.requestChangePassword = {
      oldPassword: this.oldPassword.value,
      newPassword: this.newPassword.value,
      confirmPassword: this.newPassword.value
    };

    // Changing users password
    this.usersControllerService
    .changePassword({
      body: this.requestChangePassword
    })
    .subscribe({
      next: (response) => {
        this.loading = false;
        this.modal.handleModal(true,'Password Changed Successfully', 'Password changed successfully !', 'green');
        this.changePasswordForm.reset();

        setTimeout(() => {
          this.modal.showModal = false;
        }, 5000);
      },
      error: (error) => {
        this.loading = false;
        this.modal.handleModal(true,'Password change failed !' ,'Error : ' +  error.error.error, 'red');
        this.changePasswordForm.reset();
        setTimeout(() => {
          this.modal.showModal = false;
        }, 5000);
      }
    })

    
   

  }

}
