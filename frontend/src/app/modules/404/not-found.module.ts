import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundRouting } from './not-found-routing.module';


@NgModule({
    imports: [
      CommonModule,
      HttpClientModule,
      NotFoundRouting
    ]
  })
  export class NotFoundModule { }