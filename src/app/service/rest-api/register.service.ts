import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/model/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
 registerUrl;  
 baseUrl = 'http://10.1.80.66:8080';


  constructor(private httpClient : HttpClient) { }

  registerUser(user:any) : Observable<User>{
       this.registerUrl = `${this.baseUrl}/register`;
      // console.log(user);
    return  this.httpClient.post<User>(this.registerUrl , user);
  }

}
