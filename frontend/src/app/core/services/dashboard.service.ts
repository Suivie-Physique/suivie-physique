import { Injectable, OnInit } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DashboardService implements OnInit {
    constructor() { }

    ngOnInit(): void {
    }

    // settings page , calculating the height of the page
    public calculateSettingsPageHeight(): number {
        let height = window.innerHeight;
        let navbarHeight = document.getElementById('navbar')?.clientHeight;
        let topbarHeight = document.getElementById('topbar')?.clientHeight;
        let settingsPageHeight = height - navbarHeight! - topbarHeight!;
        return settingsPageHeight;
    } 

    public getSettingsPageContainerMesures(): {[klass: string]: string | any} {
        let height = this.calculateSettingsPageHeight();
        let width = window.innerWidth;

        return {width: '100%', height: height + 'px'};
    }


}