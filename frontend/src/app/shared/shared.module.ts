import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { AlertComponent } from './alert/alert.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgxMaskDirective, provideEnvironmentNgxMask} from "ngx-mask";
import { LabelComponent } from './label/label.component';
import { SelectComponent } from './select/select.component';
import { ModalComponent } from './modal/modal.component';



@NgModule({
    declarations: [
        InputComponent,
        AlertComponent,
        LabelComponent,
        SelectComponent,
        ModalComponent
    ],
  exports: [
    InputComponent,
    AlertComponent,
    LabelComponent,
    SelectComponent,
    ModalComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgxMaskDirective
    ],
    providers: [
      provideEnvironmentNgxMask()
    ]
})
export class SharedModule { }
