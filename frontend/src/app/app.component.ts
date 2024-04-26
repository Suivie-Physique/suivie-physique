import { Component } from '@angular/core';

import { ThemeService } from './core/services/theme.service';
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [NgClass, RouterOutlet],
})
export class AppComponent {
  title = 'frontend';

  constructor(public themeService: ThemeService) {}
}
