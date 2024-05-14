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
import { ShowMemberButtonComponent } from './show.membre.component';
import { ShowModalService } from '../../services/show.modal.service';
import { Subscription } from 'rxjs';
import { Member } from '../../../../dashboard/models/membre.model';
import { MemberResponse } from '../../../../../api/models/member-response';
import { MembersStatsResponse } from 'app/api/models';
import { Role } from '../../../../../core/constants/roles';
import { ChangeMemberRequest, ChangeRoleRequest } from 'app/api/models';


@Component({
  selector: 'app-membres',
  standalone: true,
  imports: [CommonModule, ScrollPanelModule ,FormsModule, ReactiveFormsModule, HttpClientModule, SharedModule, AgGridAngular, NgFor, NgIf],
  templateUrl: './membres.component.html',
  providers: [UsersControllerService]
})
export class MembresComponent implements OnInit {
  membres!: Member[];
  roles: string[] = Role.roles;

  loading: boolean = false;
  isChange: boolean = false;
  isLoading: boolean = false;
  containerMesures: {[klass: string]: string | any} = {};
  
  activeMembre: Member = { fullname: "Larbi Wiran", email: "larbi@ncrm.com", status: "active", role: "Exploitant", last_connected: "2021-08-01", actions: 'modify', id: undefined, enabled: undefined, createdDate: undefined,
  authorities: undefined
  }; 
  modal: Modal = new Modal();
  pagination = true;
  paginationPageSize = 500;
  paginationPageSizeSelector = [200, 500, 1000];

  subscription: Subscription

  showMemberModal: boolean = false;

  controls = {
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', [Validators.required]),
    status: new FormControl(false, [Validators.required])
  };
  
  modifyMemberForm: FormGroup = new FormGroup({});
  changeMemberRequest : ChangeMemberRequest = {email: '', newRole: '', newStatus: false};
  membersStats: MembersStatsResponse = {
    totalActiveMembers: 0,
    totalMembers: 0,
    totalMembersConnected: 0,
    totalRoles: 0
  }
  
  // Column Definitions: Defines the columns to be displayed.
  columnDefs: (ColDef<any, any> | ColGroupDef<any>)[] = [
    { 
      headerName: "Nom Complet", 
      field: "fullname", 
      cellClass: ['text-gray-600'],
      filter: true, 
      floatingFilter: true, 
      flex: 1
    },
    { 
      headerName: "Email", 
      field: "email",
      cellClass: ['text-gray-600'],
      filter: true, 
      floatingFilter: true, 
      flex: 1 
    },
    { 
      headerName: "Status", 
      field: "status",
      cellClass: ['text-gray-600','text-center'], 
      filter: true, 
      floatingFilter: true, 
      flex: 1 
    },
    { 
      headerName: "Role", 
      field: "role",
      cellClass: params => { return params.value == "TRAIT_EFFET" ? ['text-teal-500', 'text-center'] : params.value == "TRAIT_CHEQUE" ? ['text-pink-500', 'text-center'] : params.value == "ADMIN" ? ['text-yellow-400', 'text-center'] : ['text-gray-500', 'text-center']}, 
      filter: true, 
      floatingFilter: true, 
      flex: 1 
    },
    { 
      headerName: "Dernière Connexion", 
      field: "last_connected", 
      cellClass: ['text-gray-600'], 
      filter: true, 
      floatingFilter: true, 
      flex: 2
    },
    { 
      headerName: "Actions", 
      field: "actions", 
      flex: 1, 
      cellRenderer: ShowMemberButtonComponent
    }
  ];
  
  rowData: Member[] | null = null;



  constructor(private usersControllerService: UsersControllerService, private dashboardService: DashboardService, private showModalService: ShowModalService) {
    this.subscription = this.showModalService.buttonClick$.subscribe(data => {
      this.activeMembre = data;
      this.toggleShowMemberModal();

      this.controls.email.setValue(this.activeMembre.email!);
      this.controls.role.setValue(this.activeMembre.role!);
      this.controls.status.setValue(this.activeMembre.status! == 'active' ? false : true);
      this.modifyMemberForm = new FormGroup(this.controls);
    });
  }

  ngOnInit(): void {
    this.containerMesures = this.dashboardService.getSettingsPageContainerMesures();
    this.loadMembresStats();
    this.refreshGrid();
  }



  refreshGrid() {
    this.usersControllerService
    .getMembers()
    .subscribe({
      next: (response: Array<MemberResponse> ) => {
        this.rowData = response.map((member: MemberResponse): Member => {
          return {
            fullname: member.fullName,
            email: member.email,
            role: member.role,
            id: undefined,
            status: member.accountLocked ? 'locked' : 'active',
            enabled: member.enabled,
            last_connected: member.last_connected,
            authorities: undefined,
            actions: 'modify'
          };
      });
    },
      error: (error) => {
        console.log(error);
      }
    
    });
  }



  toggleShowMemberModal() {
    this.showMemberModal = !this.showMemberModal;
  }

  modifyMember() {
    this.changeMemberRequest = {
      email: this.controls.email.value!,
      newRole: this.controls.role.value! ,
      newStatus: this.controls.status.value!
    }

  this.usersControllerService
    .changeMember({
      body: this.changeMemberRequest
    })
    .subscribe({
      next: (response) => {
        this.toggleShowMemberModal();
        // refresh the grid
        this.refreshGrid();
      },
      error: (error) => {
        this.modal.handleModal(true,'Role change failed !' ,'Error : ' +  error.error.error, 'red');
        console.log(error);
      }
    });

  }

  loadMembresStats(){
    this.usersControllerService
    .getMembersStats()
    .subscribe({
      next: (response: MembersStatsResponse) => {
        this.membersStats = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  
}
