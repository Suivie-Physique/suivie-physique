import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TraitementRoutingModule } from './traitement-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChequeComponent } from './pages/cheque/cheque.component';
import { EffetComponent } from './pages/effet/effet.component';


@NgModule({
    imports: [
        HttpClientModule,
        CommonModule,
        TraitementRoutingModule

    ],
    declarations: [
    ChequeComponent,
    EffetComponent
  ]

})
export class TraitementModule { }
