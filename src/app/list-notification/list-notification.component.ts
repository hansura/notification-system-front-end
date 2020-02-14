import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from '../service/rest-api/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig, MatIconRegistry } from '@angular/material';
import { UpdateNotificationComponent } from '../update-notification/update-notification.component';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ConfirmNotificationCloseComponent } from '../confirm-notification-close/confirm-notification-close.component';
import { DomSanitizer } from '@angular/platform-browser';
import { element } from 'protractor';

@Component({
  selector: 'app-list-notification',
  templateUrl: './list-notification.component.html',
  styleUrls: ['./list-notification.component.css'],
  providers: [DatePipe]
})
export class ListNotificationComponent implements OnInit {

  username : any;
  dataSource : any;
  notifications;
  displayedColumns : string [];
  @ViewChild(MatSort , {static : true }) sort : MatSort;
  @ViewChild(MatPaginator , {static : true}) paginator : MatPaginator;
  nextDate  : number;
  currentDate : string;
  countNotification = 0;

  selectedRowIndex = -1;
  constructor(
      private notificationService : NotificationService ,
      private route : ActivatedRoute,
      public  matDialog : MatDialog ,
      public datePipe : DatePipe  ,
      private router : Router ,
      private toster : ToastrService ,
      public matIconRegistry : MatIconRegistry ,
      public domSanitizer : DomSanitizer

      ) { }

  ngOnInit() {
    this.displayedColumns = [ 'issueId' , 'branch' ,'removedUser',
    'removedPosition','userId' ,'previousPosition','currentPosition' 
    ,'dateFrom' , 'dateUpto' ,'status' , 'action']
      
      this.currentDate = this.datePipe.transform(Date.now() , 'yyyy-MM-dd');
      console.log(this.currentDate);
       this.username = this.route.snapshot.params['username'];
       this.getAllNotification();

       

       this.matIconRegistry.addSvgIcon('close' , this.domSanitizer.bypassSecurityTrustResourceUrl('assets/closed-svgrepo-com.svg'));
       this.matIconRegistry.addSvgIcon('open' , this.domSanitizer.bypassSecurityTrustResourceUrl('assets/open-svgrepo-com-1.svg'));
   
  }

  getAllNotification(){

    let sortBy = (p,a) => a.sort((i , j ) => p.map( v => i[v] - j[v]).find( r=>r) );
     this.notifications = new Array();
       this.notificationService.getAllNotification(this.username).subscribe(
           data=>{
                   this.notifications = data;
                    sortBy([ 'status' ,'dateUpto'] , this.notifications);
                 //  console.log(this.notifications);

                   this.dataSource = new MatTableDataSource(this.notifications);
                   this.dataSource.sort = this.sort;
                   this.dataSource.paginator = this.paginator;
                //    console.log(this.notifications);
                      // for(let i of this.notifications){
                      //    console.log(i.removedPosition['role'][0].roleName);
                      // }
                      for(let i = 0; i < this.notifications.length; i++ ){
                        if(this.updateDate(this.notifications[i].dateUpto) <= this.currentDate &&  this.currentDate >=  this.updateDate(this.notifications[i].dateUpto)   &&   this.notifications[i].status == false) {
                          this.countNotification = this.countNotification + 1;
                       } 
                   }
                   console.log('notiifcation count ' , this.countNotification);


                  }, 
          error =>{
              
             console.log(error.error.message);
          }


       );

  }
 
   applyFilter(searchKey : any){

     this.dataSource.filter = searchKey.trim().toLowerCase();
   }

   updateNotification(notification : any){
       console.log(notification);
         const dialogConfig = new MatDialogConfig();
          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;
          dialogConfig.width = '100vw';
          dialogConfig.data = [{data : notification , username : this.username}];
         
          this.matDialog.open(UpdateNotificationComponent, dialogConfig).afterClosed().subscribe(
            data=>{ 
               this.countNotification = 0;
               this.getAllNotification();
            }
          );


   }
   deleteNotification(notification : any){
 
     const dialogRef = new MatDialogConfig();
     dialogRef.width ="50%";
      dialogRef.disableClose = true;
      dialogRef.autoFocus = true;
      dialogRef.data = [{ notificationId : notification} , {username : this.username} ]
      this.matDialog.open(ConfirmDialogComponent , dialogRef).afterClosed().subscribe( 
       data => {
         this.countNotification = 0;
              this.getAllNotification();
       }

      );

   }

   notification(){


     this.router.navigate(['notification' , this.username]);
   }

   closeNotification(notification : any){

    const dialogRef = new MatDialogConfig();
    dialogRef.width ="50%";
     dialogRef.disableClose = true;
     dialogRef.autoFocus = true;
     dialogRef.data = [{ notificationId : notification} , {username : this.username} ]
     this.matDialog.open(ConfirmNotificationCloseComponent , dialogRef).afterClosed().subscribe( 
      data => {
              this.countNotification =0;
             this.getAllNotification();
      }

     );

   }


   updateDate(date )
   {
      // console.log('accepted date ' , date);
       if(date == null){

       }
      // console.log('date is null can not be slice');
       else
       {
      //  console.log('get the current date ' , this.datePipe.transform(date , 'yyyy-MM-dd').slice(8,10))
       this.nextDate  = (Number)( this.datePipe.transform(date , 'yyyy-MM-dd').slice(8,10)) + 1;
      //  console.log('get the next date ' , this.nextDate)
       date =   this.datePipe.transform(date , 'yyyy-MM-').concat('0'+this.nextDate);
      // console.log('next month with date ' , this.datePipe.transform(date , 'yyyy-MM-dd'));
       return  this.datePipe.transform(date , 'yyyy-MM-dd');
       }
   }
 
   todayNotification(){
  //  console.log(this.notifications)   
    let customSortNotify  = new Array();
    for(let i = 0; i < this.notifications.length; i++ ){
       
         if(this.updateDate(this.notifications[i].dateUpto) <= this.currentDate &&  this.currentDate >=  this.updateDate(this.notifications[i].dateUpto)   &&   this.notifications[i].status == false) {
            customSortNotify.push(this.notifications[i]);
        }
       
    }

    
   }
  
 
   highlight(row){
    this.selectedRowIndex = row.id;
}


}
