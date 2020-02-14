import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { LoginService } from './rest-api/login.service';
import { RegisterService } from './rest-api/register.service';
@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor(private authenticationService : LoginService ,
      private registerService : RegisterService ,
       private router : Router ,
       )  { }

   

   public authenticate(user:User){
    
     console.log('authenticate '+user.username );
     
    return this.authenticationService.authenticate(user);
   }

   public getUserName(){

    return localStorage.getItem('username');
   }

   public getToken(){

    return localStorage.getItem('token');
  }
   public isUserLoggedIn(){

    let username = this.getUserName();
    let token = this.getToken();
    return !(username == null && token == null);
   }
   public logout(){

      localStorage.removeItem('username');
       localStorage.removeItem('token');
     return this.router.navigate(['login']);
   }

    public registerUser(user: User){
         
      return this.registerService.registerUser(user);
    }

}
