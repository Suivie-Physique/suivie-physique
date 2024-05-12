import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../api/services/authentication.service';
import { JwtTokenService } from '../../../../core/services/jwt-token.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    standalone: true,

    providers: [AuthenticationService, JwtTokenService]
})
export class LogoutComponent implements OnInit{

    constructor(private authenticationService: AuthenticationService, private tokenService: JwtTokenService, private router: Router) {}

    ngOnInit(): void {
        this.authenticationService.logout();
        this.tokenService.removeToken();
        
        // Redirect to login page
        this.router.navigate(['/auth/authenticate']);
    }

}