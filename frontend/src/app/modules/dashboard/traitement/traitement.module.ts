import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TraitementRoutingModule } from './traitement-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@NgModule({
    imports: [
        HttpClientModule,
        CommonModule,
        TraitementRoutingModule

    ],
    declarations: []
})
export class TraitementModule { }
