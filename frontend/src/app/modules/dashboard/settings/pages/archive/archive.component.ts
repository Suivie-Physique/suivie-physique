import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor, NgIf } from '@angular/common';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { SharedModule } from '../../../../../shared/shared.module';
import { UsersControllerService } from '../../../../../api/services';
import { Modal } from '../../../../../core/constants/modal';
import { DashboardService } from 'app/core/services/dashboard.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, ColGroupDef, ValueGetterParams, RowClassParams } from 'ag-grid-community';
import { ShowModalService } from '../../services/show.modal.service';
import { Subscription } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { GridChartsModule } from "@ag-grid-enterprise/charts-enterprise";
import { ShowArchiveComponent } from './show.archive.component';
import { CalendarModule } from 'primeng/calendar';
import { DatePipe } from '@angular/common';

import { ArchiveResponse } from '../../../../../api/models/archive-response';

import "ag-grid-charts-enterprise";

ModuleRegistry.registerModules([ClientSideRowModelModule, GridChartsModule]);

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [CommonModule, ScrollPanelModule ,FormsModule, ReactiveFormsModule, HttpClientModule, SharedModule, AgGridAngular, NgFor, NgIf, ButtonModule, CalendarModule],
  templateUrl: './archive.component.html',
  providers: [UsersControllerService, DatePipe]
})
export class ArchiveComponent {

  modal: Modal = new Modal();
  containerMesures: {[klass: string]: string | any} = {};
  loadingArchivage: boolean = false;
  loadingConservage: boolean = false;
  isChange: boolean = false;
  isLoading: boolean = false;
  pagination = true;
  paginationPageSize = 500;
  paginationPageSizeSelector = [200, 500, 1000];
  rowGroupPanelShow: "always" | "onlyWhenGrouping" | "never" | undefined = "always";
  date: Date | undefined;
  today: Date = new Date();
  formattedDate: string = "";

  showArchiveFormModal: boolean = false;
  choix: string[] = [];

  rowData: ArchiveResponse[] = [
    {archivist: "Larbi Wiran", dateArchive: "2024-06-01", totalValeurs: 100, type: "Conservation"},
    {archivist: "Larbi Wiran", dateArchive: "2024-06-02", totalValeurs: 100, type: "Conservation"}
  ];

  
  columnDefs: ColDef[] = [
    { headerName: "Archivist", field: "archivist", sortable: true, filter: true, resizable: true, flex: 1 },
    { headerName: "Date d'archive", field: "dateArchive", sortable: true, filter: true, resizable: true, flex: 1 },
    { headerName: "Total valeurs", field: "totalValeurs", sortable: true, filter: true, resizable: true, flex: 1 },
    { headerName: "Type", field: "type", sortable: false, filter: false, resizable: true, flex: 1 },
    {headerName: "View", cellRenderer: ShowArchiveComponent, flex: 1}
  ];

  constructor(private usersControllerService: UsersControllerService, private dashboardService: DashboardService, private showModalService: ShowModalService, private datePipe: DatePipe) {
    this.choix = [];
  }

  ngOnInit(): void {
    this.containerMesures = this.dashboardService.getSettingsPageContainerMesures();
  }

  formatDate() {
    this.formattedDate = this.datePipe.transform(this.date, 'dd/MM/yyyy')!;
  }

  toggleShowArchiveFormModal(){
    this.showArchiveFormModal = !this.showArchiveFormModal;
  }

  onCheckboxChange(event: any){
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.choix.push(target.value);
    } else {
      const index = this.choix.indexOf(target.value);
      if (index > -1) {
        this.choix.splice(index, 1);
      }
    }
  }
  

  archiver(){
    this.loadingArchivage = true;
    this.formatDate();
    console.log(this.formattedDate);
    
    
    setTimeout(() => {
      this.loadingArchivage = false;
    }, 3000);
  }
  
  conserver(){
    this.loadingConservage = true;
    this.formatDate();
    console.log(this.formattedDate);

    setTimeout(() => {
      this.loadingConservage = false;
    }, 3000);

  }
}
