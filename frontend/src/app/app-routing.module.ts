import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {DashboardComponent} from "./components/dashboard/dashboard.component";


import {RegisterComponent} from "./auth-user/register/register.component";
import {LoginComponent} from "./auth-user/login/login.component";
import {ActivateAccountComponent} from "./auth-user/activate-account/activate-account.component";

const routes: Routes = [
  { path: '', redirectTo: '/authenticate', pathMatch: 'full'},
  { path: 'authenticate', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'activate-account', component: ActivateAccountComponent},
  { path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
