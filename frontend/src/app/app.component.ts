import { Component, OnInit } from '@angular/core';

import { ThemeService } from './core/services/theme.service';
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';

import { NgxSpinnerModule } from "ngx-spinner";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [NgClass, RouterOutlet, NgxSpinnerModule],
})
export class AppComponent implements OnInit{
  title = 'frontend';

  constructor(public themeService: ThemeService, public spinnerService: NgxSpinnerService) {}

  ngOnInit(): void {
    // this.spinnerService.show();
    // setTimeout(() => {
    //   this.spinnerService.hide();
    // }, 5000);
  }

}
