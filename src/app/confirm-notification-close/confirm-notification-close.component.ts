import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NotificationService } from '../service/rest-api/notification.service';
import { ToastrIconClasses, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirm-notification-close',
  templateUrl: './confirm-notification-close.component.html',
  styleUrls: ['./confirm-notification-close.component.css']
})
export class ConfirmNotificationCloseComponent implements OnInit {

  username : any;
  notificationId : any;
  constructor(
  @Inject(MAT_DIALOG_DATA) public data : any ,
  public matDialogRef : MatDialogRef<ConfirmNotificationCloseComponent>,
  private notificationService : NotificationService ,
  private toastr : ToastrService

  ) { }

  ngOnInit() {

     console.log(this.data);
     this.notificationId = this.data[0].notificationId;
     this.username = this.data[1].username;
     console.log(this.notificationId);
     console.log(this.username);

  }

  ok(){
    this.notificationService.closeNotifications(this.notificationId , this.username).subscribe( 
      data=>{
           this.toastr.success('Closed Successfully', 'Notification')
           this.close();
          },
      error=>{
           this.toastr.error('Field to Close Notification');
      }

);

  }
  close(){

     this.matDialogRef.close();
  }

}
