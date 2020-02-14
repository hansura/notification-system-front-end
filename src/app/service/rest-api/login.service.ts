import { Injectable } from '@angular/core';
import { User } from 'src/app/model/User';
import { HttpClient } from '@angular/common/http';
import {    map } from 'rxjs/Operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
 
 
  baseUrl = 'http://10.1.80.66:8080';
  loginUrl ;  


  constructor(private httpClient : HttpClient) { }

  public  authenticate(user : any) : Observable<User>{
      //  console.log(user);

       this.loginUrl =  `${this.baseUrl}/authenticate`;

     return  this.httpClient.post<User>(this.loginUrl , user).pipe(
      
        map(
            data => {
                localStorage.setItem("token", 'Bearer '+ data.token);
                localStorage.setItem("username", user.username);
                 console.log(localStorage.getItem('token'));
                 console.log(localStorage.getItem('username'));
                return data;
            }

         )

     );

  }

}
