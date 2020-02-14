import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { ValidationService } from './validation.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
          private validationService : ValidationService , 
          private router : Router   
             ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler){

     let username = this.validationService.getUserName();
     let token = this.validationService.getToken();
 
      if( username !== null && token !== null){

       req = req.clone( {
           setHeaders : {
              Authorization : token
           }
       });

      }
  
      return next.handle(req);

  }



}
