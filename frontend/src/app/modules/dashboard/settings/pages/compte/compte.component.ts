import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { User } from '../../../../../core/model/user.model';
import { JwtTokenService } from '../../../../../core/services/jwt-token.service';
@Component({
  selector: 'app-compte',
  standalone: true,
  imports: [CommonModule, ScrollPanelModule],
  templateUrl: './compte.component.html'
})
export class CompteComponent implements OnInit {

  activeAccount: User = new User();

  constructor(private jwtTokenService: JwtTokenService) {}

  ngOnInit(): void {
    this.activeAccount = this.jwtTokenService.getActiveUser();
  }

}
