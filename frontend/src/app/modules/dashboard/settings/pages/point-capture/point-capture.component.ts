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
import { TypePointCapture } from 'app/core/constants/type.point.capture';

import "ag-grid-charts-enterprise";
import { CircuitAllResponse, CircuitRequest, PointCaptureRequest, PointCaptureResponse, PointCaptureStatsResponse, PointsCaptureAllResponse,  } from 'app/api/models';


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

  showAddPointCaptureModal: boolean = false;
  showAddCircuitModal: boolean = false;

  types: string[] = TypePointCapture.types
  pdcStats: PointCaptureStatsResponse = {
    totalCircuit: 0, 
    totalLecteur: 0,
    totalPointsCapture: 0,
    totalTypePointCapture: 0
  }

  controlsAddPointCapture: {[klass: string]: FormControl} = {
    libelle: new FormControl("", [Validators.required]),
    type: new FormControl("", [Validators.required]),
    clientBanque: new FormControl("", [Validators.required]),
    secteur: new FormControl("", [Validators.required]),
    lecteur: new FormControl("", [Validators.required]),
    circuit: new FormControl("", [Validators.required]),
    adresse: new FormControl("", [Validators.required]),
    status: new FormControl(true, [Validators.required])
  };

  controlsAddCircuit: {[klass: string]: FormControl} = {
    code: new FormControl("", [Validators.required]),
    libelle: new FormControl("", [Validators.required]),
    status: new FormControl(true, [Validators.required]),
    depart: new FormControl("", [Validators.required]),
    arrivee: new FormControl("", [Validators.required]),
    distance: new FormControl("", [Validators.required]),
    duree: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required])
  };
  addPointCaptureForm: FormGroup = new FormGroup({
    libelle: this.controlsAddPointCapture['libelle'],
    type: this.controlsAddPointCapture['type'],
    clientBanque: this.controlsAddPointCapture['clientBanque'],
    secteur: this.controlsAddPointCapture['secteur'],
    lecteur: this.controlsAddPointCapture['lecteur'],
    circuit: this.controlsAddPointCapture['circuit'],
    status: this.controlsAddPointCapture['status']
  });
  addCircuitForm: FormGroup = new FormGroup({
    code: this.controlsAddCircuit['code'],
    libelle: this.controlsAddCircuit['libelle'],
    description: this.controlsAddCircuit['description'],
    depart: this.controlsAddCircuit['depart'],
    arrivee: this.controlsAddCircuit['arrivee'],
    distance: this.controlsAddCircuit['distance'],
    duree: this.controlsAddCircuit['duree'],
    status: this.controlsAddCircuit['status']
  });

  addPointCaptureRequest: PointCaptureRequest = { libelle: "", type: "", clientBanque: "", secteur: "", lecteur: "", circuit: "", status: true};
  addCircuitRequest: CircuitRequest = { code: "", libelle: "", depart: "", arrivee: "", description: "", distance: "", duree: "", status: true};


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
      field: "clientBanque",
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
  rowData: PointCaptureResponse[] = [
    {
      libelle: "Addouha",
      type: "Agence",
      clientBanque: "BP",
      secteur: "Sidi Maarouf",
      lecteur: "10023",
      circuit: "Circuit 1"
    },
    {
      libelle: "Addouha",
      type: "Agence",
      clientBanque: "BP",
      secteur: "Sidi Maarouf",
      lecteur: "10023",
      circuit: "Circuit 1"
    },
    {
      libelle: "Addouha", 
      type: "Agence",
      clientBanque: "BP",
      secteur: "Sidi Maarouf",
      lecteur: "10023",
      circuit: "Circuit 1"
    },
    {
      libelle: "Addouha", 
      type: "Agence",
      clientBanque: "BP",
      secteur: "Sidi Maarouf",
      lecteur: "10023",
      circuit: "Circuit 1"
    }
  ];

  circuits: string[] = []; 
  
  constructor(private usersControllerService: UsersControllerService, private dashboardService: DashboardService, private showModalService: ShowModalService, private pointCaptureControllerService: PointCaptureControllerService) {
    
    // La population de la table des points de captures
    this.pointCaptureControllerService.getAllPointsCapture().subscribe({
      next: (data: PointsCaptureAllResponse) => {
        this.rowData = data.pointsCapture as PointCaptureResponse[];
        console.log(this.rowData);
      },
      error: (error) => {
        console.log(error);
      }
    });

    // La population de la table des circuits
    this.pointCaptureControllerService.getAllCircuits().subscribe({
      next: (data: CircuitAllResponse) => {
        this.circuits = data.circuits?.map(circuit => circuit.code) as string[];
      },
      error: (error) => {
        console.log(error);
      }
    });

    // population des statistiques
    this.pointCaptureControllerService.getPointsCaptureStats().subscribe({
      next: (data: PointCaptureStatsResponse) => {
        this.pdcStats = data;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  ngOnInit(): void {
    this.containerMesures = this.dashboardService.getSettingsPageContainerMesures();
  }

  addPointCapture(){
    this.addPointCaptureRequest = {
      libelle: this.controlsAddPointCapture['libelle'].value as string,
      type: this.controlsAddPointCapture['type'].value as string,
      clientBanque: this.controlsAddPointCapture['clientBanque'].value as string,
      secteur: this.controlsAddPointCapture['secteur'].value as string,
      lecteur: this.controlsAddPointCapture['lecteur'].value as string,
      circuit: this.controlsAddPointCapture['circuit'].value as string,
      status: this.controlsAddPointCapture['status'].value as boolean
    }  

    this.pointCaptureControllerService
    .addPointCapture({
      body: this.addPointCaptureRequest
    })
    .subscribe({
      next: (response) => {
        this.toggleAddPointCaptureModal();
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


  addCircuit(){
    this.addCircuitRequest = {
      code: this.controlsAddCircuit['code'].value as string,
      libelle: this.controlsAddCircuit['libelle'].value as string,
      depart: this.controlsAddCircuit['depart'].value as string,
      arrivee: this.controlsAddCircuit['arrivee'].value as string,
      distance: this.controlsAddCircuit['distance'].value as string,
      duree: this.controlsAddCircuit['duree'].value as string,
      description: this.controlsAddCircuit['description'].value as string,
      status: this.controlsAddCircuit['status'].value as boolean
    }

    this.pointCaptureControllerService
    .addCircuit({
      body: this.addCircuitRequest
    })
    .subscribe({
      next: (response) => {
        this.toggleAddCircuitModal();
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


  toggleAddPointCaptureModal(){
    this.showAddPointCaptureModal = !this.showAddPointCaptureModal;
    this.addPointCaptureForm.reset();
  }

  toggleAddCircuitModal(){
    this.showAddCircuitModal = !this.showAddCircuitModal;
    this.addCircuitForm.reset();
  }
}
