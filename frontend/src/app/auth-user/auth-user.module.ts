import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {SharedModule} from "../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppConstants} from "../constants/app.constants";
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import {CodeInputModule} from "angular-code-input";



// @ts-ignore
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ActivateAccountComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    CodeInputModule
  ],
  exports:[
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthUserModule { }
