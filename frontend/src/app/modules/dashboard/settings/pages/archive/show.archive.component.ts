import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { AgGridAngular, ICellRendererAngularComp } from '@ag-grid-community/angular';
import { ColDef, ColGroupDef,ValueGetterParams, ICellRendererParams } from '@ag-grid-community/core';
import { PrimeIcons } from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';
import { ShowModalService } from '../../services/show.modal.service';

@Component({
    selector: 'app-show-member-button',
    standalone: true,
    templateUrl: './show.archive.component.html',
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
  })
export class ShowArchiveComponent implements ICellRendererAngularComp {
  params?: any;
  showMemberModal: boolean = false;

  constructor(private showModalService: ShowModalService) { }

    agInit(params: any): void {
      this.params = params;
    }
    refresh() {
      return true;
    }
    
    OnClick() {
      let selectedData = this.params?.data;
      this.showModalService.buttonClicked(selectedData);
    }
  }