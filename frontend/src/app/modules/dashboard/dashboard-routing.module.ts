import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SettingsComponent } from './pages/settings/settings.component';


const routes: Routes = [
    {
      path: '',
      component: DashboardComponent,
      children: [
        { path: 'settings', component: SettingsComponent },
        { path: '**', redirectTo: 'error/404' },
      ],
    },
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class DashboardRoutingModule { }