import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  postNotificationUrl ;
  getNotificationUrl ;
  updateNotificationUrl;
  deleteNotificationUrl;
  closeNotificationUrl;
  baseUrl = 'http://10.1.80.66:8080';

  constructor(private httpClient : HttpClient) { }

    postNotification(notification : any , username : any):Observable<Notification>
    {
        this.postNotificationUrl = `${this.baseUrl}/notification/${username}/createNotification`;
        return this.httpClient.post<Notification>(this.postNotificationUrl , notification);

    }
    getAllNotification(username : any) : Observable<any>
    {
  
         this.getNotificationUrl = `${this.baseUrl}/notification/${username}/getAllNotification`;
      return this.httpClient.get<any>(this.getNotificationUrl );
    }

    updateNotification(notification : any , username :any) : Observable<any>{
      this.updateNotificationUrl =`${this.baseUrl}/notification/${username}/getAllNotification/${notification['notification'].id}`;
     // console.log(notification['notification'].id);
 
        return this.httpClient.put<any>(this.updateNotificationUrl, notification); 

    }


    deleteNotifications(notification : any , username :any) : Observable<any>{

     // console.log(notification);
      this.deleteNotificationUrl =`${this.baseUrl}/notification/${username}/deleteNotification/${notification}`;
     
        return this.httpClient.delete(this.deleteNotificationUrl);

    }

    closeNotifications(notification : any , username :any) : Observable<any>{

     // console.log(notification);
      this.closeNotificationUrl =`${this.baseUrl}/notification/${username}/closeNotification/${notification}`;
     
        return this.httpClient.put<any>(this.closeNotificationUrl , true);

    }

}
