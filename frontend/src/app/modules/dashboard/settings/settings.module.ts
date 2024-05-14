import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        HttpClientModule,
        CommonModule,
        SettingsRoutingModule
    ]
})
export class SettingsModule { }