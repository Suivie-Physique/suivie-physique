import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ContactComponent} from "./components/contact/contact.component";
import {NoticesComponent} from "./components/notices/notices.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AuthActivateRouteGuard} from "./routeguards/auth.routeguards";
import {LogoutComponent} from "./components/logout/logout.component";
import {AccountComponent} from "./components/account/account.component";
import {BalanceComponent} from "./components/balance/balance.component";
import {LoansComponent} from "./components/loans/loans.component";
import {CardsComponent} from "./components/cards/cards.component";
import {RegisterComponent} from "./auth-user/register/register.component";
import {LoginComponent} from "./auth-user/login/login.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'notices', component: NoticesComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthActivateRouteGuard]},
  { path: 'logout', component: LogoutComponent},
  { path: 'myAccount', component: AccountComponent, canActivate: [AuthActivateRouteGuard]},
  { path: 'myBalance', component: BalanceComponent, canActivate: [AuthActivateRouteGuard]},
  { path: 'myLoans', component: LoansComponent, canActivate: [AuthActivateRouteGuard]},
  { path: 'myCards', component: CardsComponent, canActivate: [AuthActivateRouteGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
