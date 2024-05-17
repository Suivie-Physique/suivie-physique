import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeftBarComponent } from './components/left-bar/left-bar.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    standalone: true,
    imports: [TopBarComponent,LeftBarComponent,CommonModule, RouterOutlet]
})
export class SettingsComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
        // Initialization code here
    }

}