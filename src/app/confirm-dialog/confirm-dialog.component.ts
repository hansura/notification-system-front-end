import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../service/rest-api/notification.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

   username : any;
   notificationId: any;
  constructor(
   @Inject(MAT_DIALOG_DATA) public data : any  ,
   private notificationService : NotificationService ,
   public dialogRef : MatDialogRef<ConfirmDialogComponent>  ,
   private toastr : ToastrService

  ) { }

  ngOnInit() {
       this.username = this.data[1]['username'];
       this.notificationId = this.data[0]['notificationId'];
         console.log(this.data);
       console.log('username' , this.username);
       console.log('notification id ' , this.notificationId)
  }

  ok(){
    
    this.notificationService.deleteNotifications(this.notificationId , this.username).subscribe( 
          data=>{
               this.toastr.success('Deleted Successfully', 'Notification')
               this.close();
              },
          error=>{
               this.toastr.error('Feild to Delete Notification');
          }

    );
     

  }


 close(){
     this.dialogRef.close();
 }


}
