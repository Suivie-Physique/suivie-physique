import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { AlertComponent } from './components/alert/alert.component';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {NgxMaskDirective, provideEnvironmentNgxMask} from "ngx-mask";
import { LabelComponent } from './components/label/label.component';
import { SelectComponent } from './components/select/select.component';
import { ModalComponent } from './components/modal/modal.component';
import { CardCenterComponent } from './components/card-center/card-center.component';
import { ButtonComponent } from './components/button/button.component';
import { ToolTipComponent } from './components/tool-tip/tool-tip.component';
import { CalendarModule } from 'primeng/calendar';


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
        FormsModule,
        ReactiveFormsModule,
        NgxMaskDirective,
        CalendarModule
    ],
    providers: [
      provideEnvironmentNgxMask()
    ]
})
export class SharedModule { }
