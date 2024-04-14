import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountComponent } from './components/account/account.component';
import { BalanceComponent } from './components/balance/balance.component';
import { CardsComponent } from './components/cards/cards.component';
import { ContactComponent } from './components/contact/contact.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { LoansComponent } from './components/loans/loans.component';
import { LogoutComponent } from './components/logout/logout.component';
import { NoticesComponent } from './components/notices/notices.component';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule} from "@angular/common/http";
import {XhrInterceptor} from "./interceptors/app.request.interceptor";
import {AuthActivateRouteGuard} from "./routeguards/auth.routeguards";
import {SharedModule} from "./shared/shared.module";
import {CommonModule} from "@angular/common";
import {AuthUserModule} from "./auth-user/auth-user.module";

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    BalanceComponent,
    CardsComponent,
    ContactComponent,
    DashboardComponent,
    HeaderComponent,
    LoansComponent,
    LogoutComponent,
    NoticesComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    SharedModule,
    AuthUserModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: XhrInterceptor,
      multi: true
    },
    AuthActivateRouteGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
