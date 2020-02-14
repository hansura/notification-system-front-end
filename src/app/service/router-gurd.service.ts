import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ValidationService } from './validation.service';

@Injectable({
  providedIn: 'root'
})
export class RouterGurdService implements CanActivate {

  constructor( private router : Router , private validationService : ValidationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    
       if(this.validationService.isUserLoggedIn())
          return true;
       
          return this.router.navigate(['login']);
  
  }
}
