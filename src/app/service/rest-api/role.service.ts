import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Role } from 'src/app/model/Role';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService{
  
      
    getAllUrl : any;
    postRoleUrl : any;
    putRoleUrl : any;
    deleteRoleUrl : any;
    baseUrl = 'http://10.1.80.66:8080';

  constructor(private httpClient : HttpClient) { }




  getAllRoles(username : any) : Observable<Role[]>{
    this.getAllUrl = `${this.baseUrl}/admin/${username}/getAllRole`;

    return this.httpClient.get<Role[]>(this.getAllUrl).pipe();
  }

  addRole(role: any , username:any){
    this.postRoleUrl = `${this.baseUrl}/admin/${username}/addRole`;

   return  this.httpClient.post<Role>(this.postRoleUrl , role);
  }

  updateRole(role : Role , username : any ){
     // console.log(username);
    this.putRoleUrl = `${this.baseUrl}/admin/${username}/updateRole/${role.id}`;
   return  this.httpClient.put<Role>(this.putRoleUrl , role);
  }
 
  deleteRole(role : any , username : any){
    this.deleteRoleUrl = `${this.baseUrl}/admin/${username}/deleteRole/${role}`;

    return this.httpClient.delete(this.deleteRoleUrl);
  }


}
