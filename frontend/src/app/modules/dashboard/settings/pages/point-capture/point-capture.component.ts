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
import { PointCaptureControllerService } from '../../../../../api/services';

import "ag-grid-charts-enterprise";
import { CircuitRequest, LecteurRequest, PointCaptureRequest } from 'app/api/models';

ModuleRegistry.registerModules([ClientSideRowModelModule, GridChartsModule]);


@Component({
  selector: 'app-point-capture',
  standalone: true,
  imports: [CommonModule, ScrollPanelModule ,FormsModule, ReactiveFormsModule, HttpClientModule, SharedModule, AgGridAngular, NgFor, NgIf, ButtonModule],
  templateUrl: './point-capture.component.html',
  providers: [UsersControllerService, PointCaptureControllerService]
})
export class PointCaptureComponent implements OnInit {

  modal: Modal = new Modal();
  containerMesures: {[klass: string]: string | any} = {};
  loading: boolean = false;
  isChange: boolean = false;
  isLoading: boolean = false;
  pagination = true;
  paginationPageSize = 500;
  paginationPageSizeSelector = [200, 500, 1000];
  rowGroupPanelShow: "always" | "onlyWhenGrouping" | "never" | undefined = "always";

  showAddScannerModal: boolean = false;
  showAddCircuitModal: boolean = false;

  controlsAddScanner: {[klass: string]: FormControl} = {
    libelle: new FormControl("", [Validators.required]),
  };
  controlsAddCircuit: {[klass: string]: FormControl} = {
    libelle: new FormControl("", [Validators.required]),
  };
  addScannerForm: FormGroup = new FormGroup({
    libelle: this.controlsAddScanner['libelle'],
  });
  addCircuitForm: FormGroup = new FormGroup({
    libelle: this.controlsAddCircuit['libelle'],
  });

  columnDefs: (ColDef<any, any> | ColGroupDef<any>)[] = [
    {
      headerName: "Point de Capture", 
      field: "libelle",
      cellClass: ['text-gray-600'],
      filter: true, 
      floatingFilter: true, 
      flex: 1 ,
      enableRowGroup: true,
    },
    {
      headerName: "Type", 
      field: "type",
      cellClass: ['text-gray-600'],
      filter: true, 
      floatingFilter: true, 
      flex: 1 ,
      enableRowGroup: true,
    },
    {
      headerName: "Client Banque", 
      field: "client",
      cellClass: ['text-gray-600'],
      filter: true, 
      floatingFilter: true, 
      flex: 1,
      enableRowGroup: true,
    },
    {
      headerName: "Secteur", 
      field: "secteur",
      cellClass: ['text-gray-600'],
      filter: true, 
      floatingFilter: true, 
      flex: 1,
      enableRowGroup: true,
    },
    {
      headerName: "Lecteur Scanner", 
      field: "lecteur",
      cellClass: ['text-gray-600'],
      filter: true, 
      floatingFilter: true, 
      flex: 1,
      enableRowGroup: true,
    },
    {
      headerName: "Circuit", 
      field: "circuit",
      cellClass: ['text-gray-600'],
      filter: true, 
      floatingFilter: true, 
      flex: 1,
      enableRowGroup: true,
    },
  ];
  rowData = [
    {
      libelle: "Addouha", 
      type: "Agence",
      client: "BP",
      secteur: "Sidi Maarouf",
      lecteur: "10023",
      circuit: "Circuit 1"
    },
    {
      libelle: "Addouha", 
      type: "Agence",
      client: "BP",
      secteur: "Sidi Maarouf",
      lecteur: "10023",
      circuit: "Circuit 1"
    },
    {
      libelle: "Addouha", 
      type: "Agence",
      client: "BP",
      secteur: "Sidi Maarouf",
      lecteur: "10023",
      circuit: "Circuit 1"
    },
    {
      libelle: "Addouha", 
      type: "Agence",
      client: "BP",
      secteur: "Sidi Maarouf",
      lecteur: "10023",
      circuit: "Circuit 1"
    },
    {
      libelle: "Addouha", 
      type: "Agence",
      client: "BP",
      secteur: "Sidi Maarouf",
      lecteur: "10023",
      circuit: "Circuit 1"
    }
  ];
  
  constructor(private usersControllerService: UsersControllerService, private dashboardService: DashboardService, private showModalService: ShowModalService, private pointCaptureControllerService: PointCaptureControllerService) {
    this.pointCaptureControllerService.getAllPointsCapture().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  ngOnInit(): void {
    this.containerMesures = this.dashboardService.getSettingsPageContainerMesures();
  }

  addScanner(){
    let request: LecteurRequest = {
      libelle: this.controlsAddScanner['libelle'].value as string
    }

    this.pointCaptureControllerService
    .addLecteur({
      body: request
    })
    .subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    });   
  }
  toggleAddScannerModal(){
    this.showAddScannerModal = !this.showAddScannerModal;
  }
  addCircuit(){
    let request: CircuitRequest = {
      libelle: this.controlsAddCircuit['libelle'].value as string
    }

    this.pointCaptureControllerService
    .addCircuit({
      body: request
    })
    .subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    });

  }
  toggleAddCircuitModal(){
    this.showAddCircuitModal = !this.showAddCircuitModal;
  }
}
