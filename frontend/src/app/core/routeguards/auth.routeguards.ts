import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot,Router } from '@angular/router';
import { User } from '../model/user.model';
import { Token } from '../model/token.model';
import { JwtTokenService } from '../services/jwt-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthActivateRouteGuard implements CanActivate {
  private token: string = '';
  constructor(private router: Router, private tokenService: JwtTokenService){}

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot)
  : boolean | Promise<boolean> {
    // @ts-ignore
    this.token = localStorage.getItem("token");
    if(!this.token){
      console.log("User not authenticated");
      this.router.navigate(['/auth/authenticate']);
    }
    return this.token?true:false;
  }

}
