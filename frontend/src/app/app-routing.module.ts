import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AuthActivateRouteGuard} from "./routeguards/auth.routeguards";

import {RegisterComponent} from "./auth-user/register/register.component";
import {LoginComponent} from "./auth-user/login/login.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthActivateRouteGuard]},
  // { path: 'logout', component: LogoutComponent},

  // { path: 'notices', component: NoticesComponent},
  // { path: 'contact', component: ContactComponent},
  // { path: 'myAccount', component: AccountComponent, canActivate: [AuthActivateRouteGuard]},
  // { path: 'myBalance', component: BalanceComponent, canActivate: [AuthActivateRouteGuard]},
  // { path: 'myLoans', component: LoansComponent, canActivate: [AuthActivateRouteGuard]},
  // { path: 'myCards', component: CardsComponent, canActivate: [AuthActivateRouteGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
