import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  getAllPositionUrl : any;
  postPositionUrl : any;
  updatePositionUrl : any;
  deletePositionUrl : any;
  baseUrl = 'http://10.1.80.66:8080';


  constructor(private httpClient : HttpClient) { }

  addPosition(position: any , username : any){
     this.postPositionUrl = `${this.baseUrl}/admin/${username}/addPosition`;

     return this.httpClient.post<Position>(this.postPositionUrl, position);
  }

  getAllPosition(username : any) : Observable<Position[]>{
  
      this.getAllPositionUrl = `${this.baseUrl}/admin/${username}/getAllPosition` ;
   
       return this.httpClient.get<Position[]>(this.getAllPositionUrl).pipe();

  }

   updatePosition( position : any, username : any ){
     this.updatePositionUrl = `${this.baseUrl}/admin/${username}/updatePosition/${position['position'].id}`;
      // console.log(position['position'].id)
    return this.httpClient.put<Position>(this.updatePositionUrl, position);
   }

   deletePosition(position : any , username : any){
      //console.log('position id ' , position);
      this.deletePositionUrl = `${this.baseUrl}/admin/${username}/deletePosition/${position}`;
     
       return this.httpClient.delete(this.deletePositionUrl);

   }

}
