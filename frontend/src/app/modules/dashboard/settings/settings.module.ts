import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ClientComponent } from './pages/client/client.component';
import { SecuriteComponent } from './pages/securite/securite.component';

@NgModule({
    imports: [
        HttpClientModule,
        CommonModule,
        SettingsRoutingModule
    ],
    declarations: [
      ClientComponent,
      SecuriteComponent
    ]
})
export class SettingsModule { }