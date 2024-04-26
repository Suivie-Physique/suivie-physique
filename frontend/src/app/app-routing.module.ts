import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthActivateRouteGuard } from './core/routeguards/auth.routeguards';

// import { LoginComponent } from './auth-user/pages/login/login.component';
// import { RegisterComponent } from './auth-user/pages/register/register.component';
// import { ActivateAccountComponent } from './auth-user/pages/activate-account/activate-account.component';
// import { LoginComponent } from './modules/auth/pages/login/login.component';
// import { RegisterComponent } from './modules/auth/pages/register/register.component';
// import { ActivateAccountComponent } from './modules/auth/pages/activate-account/activate-account.component';



const routes: Routes = [
  {
    path: '',
    canActivate: [AuthActivateRouteGuard],
    loadChildren: () => import('../app/modules/layout/layout.module').then(m => m.LayoutModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth-user.module').then(m => m.AuthUserModule)
  },
  {
    path: '**',
    redirectTo: 'error/404'
  },
  {
    path: 'error/404',
    loadChildren: () => import('./modules/404/not-found.module').then(m => m.NotFoundModule)
  }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
