import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthUserRouting} from "./auth-user-routing.module";
import { HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '../../core/interceptors/auth.interceptor';
import { RefreshInterceptor } from 'app/core/interceptors/refresh.interceptor';


// @ts-ignore
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AuthUserRouting
  ],
  providers: [
    AuthInterceptor,
    RefreshInterceptor
  ]
})
export class AuthUserModule { }