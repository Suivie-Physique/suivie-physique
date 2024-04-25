import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot,Router } from '@angular/router';
import { User } from '../model/user.model';

@Injectable()
export class AuthActivateRouteGuard implements CanActivate {
  user = new User();

  constructor(private router: Router){

  }

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot){
    // @ts-ignore
    this.user = JSON.parse(sessionStorage.getItem("userdetails"));
    if(!this.user){
      this.router.navigate(['authenticate']);
    }
    return this.user?true:false;
  }

}
