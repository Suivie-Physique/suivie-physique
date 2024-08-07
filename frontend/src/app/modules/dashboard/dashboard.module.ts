import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SettingsComponent } from './pages/settings/settings.component';

@NgModule({
  imports: [
    DashboardRoutingModule,
  ]
})
export class DashboardModule {}
