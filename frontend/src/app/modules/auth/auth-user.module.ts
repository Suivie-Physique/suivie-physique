import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthUserRouting} from "./auth-user-routing.module";
import { HttpClientModule } from '@angular/common/http';

// @ts-ignore
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AuthUserRouting
  ]
})
export class AuthUserModule { }