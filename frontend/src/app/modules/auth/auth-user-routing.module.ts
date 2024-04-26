import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import { AuthUserComponent } from './auth-user.component';


const routes: Routes = [
  { 
    path: '', 
    component: AuthUserComponent,
    children: [
      { path: '', redirectTo: 'authenticate', pathMatch: 'full'},
      { path: 'authenticate', component: LoginComponent},
      { path: 'register', component: RegisterComponent},
      { path: 'activate-account', component: ActivateAccountComponent},
      { path: '**', redirectTo: 'authenticate', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthUserRouting { }