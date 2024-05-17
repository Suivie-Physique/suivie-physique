import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { SettingItem } from '../../../../../core/model/setting.model';
import { NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  standalone: true,
  imports: [NgFor, RouterLink, RouterLinkActive],
})
export class LeftBarComponent implements OnInit{
  public settingsItems: SettingItem[] = [];
  
  constructor(private settingsService: SettingsService) {}
  
  ngOnInit(): void {
    this.settingsItems = this.settingsService.getSettingItems();
  }

}
