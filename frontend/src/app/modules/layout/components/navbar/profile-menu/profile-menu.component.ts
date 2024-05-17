import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass, NgFor, NgIf} from '@angular/common';
import { ClickOutsideDirective } from '../../../../../core/directives/click-outside.directive';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ThemeService } from '../../../../../core/services/theme.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Input } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';
import { User } from '../../../../../core/model/user.model';
import { JwtTokenService } from '../../../../../core/services/jwt-token.service';
import { ThemeCode, Themes } from '../../../../../core/constants/theme';
import { ProfileMenu, ProfileMenuItem } from '../../../../../core/constants/profile.menu';
import { TagModule } from 'primeng/tag';
interface JwtPayload {
  fullName?: string;
  sub?: string;
  authorities?: string;
  iat?: string;
  exp?: string;
}
@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  standalone: true,
  imports: [ClickOutsideDirective, NgClass,NgFor,NgIf,  RouterLink,  AngularSvgIconModule, TooltipModule, TagModule],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          opacity: 1,
          transform: 'translateY(0)',
          visibility: 'visible',
        }),
      ),
      state(
        'closed',
        style({
          opacity: 0,
          transform: 'translateY(-20px)',
          visibility: 'hidden',
        }),
      ),
      transition('open => closed', [animate('0.2s')]),
      transition('closed => open', [animate('0.2s')]),
    ]),
  ],
})
export class ProfileMenuComponent implements OnInit {
  isFullScreen: boolean = false;
  element: any = null;
  document: any = null;
  public isOpen = false;
  public themeColors: ThemeCode[] = Themes.themes;
  public profileMenu: ProfileMenuItem[] = ProfileMenu.menus;
  public themeMode: Array<string> = Themes.modes;
  public userAuth: User = new User();

  constructor(public themeService: ThemeService,public jwtTokenService: JwtTokenService ) {}

  ngOnInit(): void {
    this.document = document;
    this.element = document.documentElement;
    this.userAuth = this.jwtTokenService.getActiveUser();
  }

  public toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  /**
   * Fullscreen method
   */
  toggleFullscreenMode(): void {
    document.body.classList.toggle('fullscreen-enable');
    if (!document.fullscreenElement && !this.element.mozFullScreenElement && !this.element.webkitFullscreenElement) {
      // If the document is not in full screen
      this.isFullScreen = true;
      if (this.element.requestFullscreen) {
        this.element.requestFullscreen();
      } else if (this.element.mozRequestFullScreen) {
        /* Firefox */
        this.element.mozRequestFullScreen();
      } else if (this.element.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.element.webkitRequestFullscreen();
      } else if (this.element.msRequestFullscreen) {
        /* IE/Edge */
        this.element.msRequestFullscreen();
      }
      
    } else {
      if (this.document.exitFullscreen) {
        // If the document is in full screen
        this.isFullScreen = false;
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }


  toggleThemeMode() {
    this.themeService.theme.update((theme) => {
      const mode = !this.themeService.isDark ? 'dark' : 'light';
      return { ...theme, mode: mode };
    });
  }

  toggleThemeColor(color: string) {
    this.themeService.theme.update((theme) => {
      return { ...theme, color: color };
    });
  }
}
