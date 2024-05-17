import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsModule } from './settings/settings.module';
import { DashboardComponent } from './dashboard.component';
// import { SettingsComponent } from './pages/settings/settings.component';


const routes: Routes = [
    {
      path: '',
      component: DashboardComponent
    },
    {
      path: 'settings',
      loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule)
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class DashboardRoutingModule { }