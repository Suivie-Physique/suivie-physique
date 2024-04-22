import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { AlertComponent } from './alert/alert.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgxMaskDirective, provideEnvironmentNgxMask} from "ngx-mask";
import { LabelComponent } from './label/label.component';
import { SelectComponent } from './select/select.component';
import { ModalComponent } from './modal/modal.component';
import { CardCenterComponent } from './card-center/card-center.component';
import { ButtonComponent } from './button/button.component';
import { ToolTipComponent } from './tool-tip/tool-tip.component';



@NgModule({
    declarations: [
        InputComponent,
        AlertComponent,
        LabelComponent,
        SelectComponent,
        ModalComponent,
        CardCenterComponent,
        ButtonComponent,
        ToolTipComponent
    ],
  exports: [
    InputComponent,
    AlertComponent,
    LabelComponent,
    SelectComponent,
    ModalComponent,
    CardCenterComponent,
    ButtonComponent,
    ToolTipComponent
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
