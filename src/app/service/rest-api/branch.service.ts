import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Branch } from 'src/app/model/Branch';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
 
    posthUrl ;
    getUrl ;
    deleteBranchUrl ;
    updateUrl;
    baseUrl = 'http://10.1.80.66:8080';
  constructor( private httpClient : HttpClient) { }

  
  addBranch(branch : Branch){
     
    this.posthUrl = `${this.baseUrl}/notification/admin/allBranch/addBranch`;
    return this.httpClient.post<Branch>(this.posthUrl , branch);
  }
  getBranch() : Observable<Branch[]>{
      this.getUrl = `${this.baseUrl}/notification/admin/allBranch/`;
    return this.httpClient.get<Branch[]>(this.getUrl);
  }
  modifyBranch(branch:Branch){
    this.updateUrl = `${this.baseUrl}/notification/admin/allBranch/updateBranch/${branch.id}`;
     
    return this.httpClient.put<Branch>(this.updateUrl, branch);
  }

  deleteBranch(branch : any){
   // console.log('branch id ', branch);
    this.deleteBranchUrl = `${this.baseUrl}/notification/admin/allBranch/deleteBranch/${branch}`;
     
    return this.httpClient.delete(this.deleteBranchUrl);
  }


}
