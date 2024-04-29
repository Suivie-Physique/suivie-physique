import { Injectable } from '@angular/core';
import { Setting } from '../../../../core/constants/settings';
import { SettingItem } from '../../../../core/model/setting.model';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private settingsItems: Setting = {};

    constructor() { }

    getSettingItems(): SettingItem[] {
        return Setting.pages;
    }

    
}