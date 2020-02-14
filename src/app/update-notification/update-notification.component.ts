import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from '../service/rest-api/notification.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PositionService } from '../service/rest-api/position.service';
import { BranchService } from '../service/rest-api/branch.service';
import { ToastrService } from 'ngx-toastr';
import { Branch } from '../model/Branch';

@Component({
  selector: 'app-update-notification',
  templateUrl: './update-notification.component.html',
  styleUrls: ['./update-notification.component.css']
})
export class UpdateNotificationComponent implements OnInit {

  notificationFormGroup : FormGroup;
   notification : any;
   username : any;
   branchId : any;
   currentId : any;
   previousId : any;
   removedId : any;
   notificationId :  any;
   branches  : Branch[];
   positions : any;
    previousRoles  = new Array();
    currentRoles  = new Array();
    removedRoles = new Array();
  constructor(
    private notificationService : NotificationService,
    public dialogRef : MatDialogRef<UpdateNotificationComponent>,
    @Inject(MAT_DIALOG_DATA ) public data : any ,
    private positionService : PositionService,
    private branchSerivice : BranchService ,
    private toastr : ToastrService ,
  ) { }

  ngOnInit() {
  
    this.initUpdateComponent();
        

  //  console.log(this.notificationId)
    this.notificationFormGroup = new FormGroup( {
              
      notification : new FormGroup( { 

             id: new FormControl(this.notificationId ),
            issueId : new FormControl(this.notification.issueId , Validators.required),
            userId : new FormControl( this.notification.userId, Validators.required),
            removedUserId : new FormControl( this.notification.removedUserId , Validators.required),
            dateFrom : new FormControl(this.notification.dateFrom, Validators.required),
            dateUpto : new FormControl(this.notification.dateUpto ),
            makerId : new FormControl(this.username)
        
      }),

      branchId : new FormControl(this.branchId ,Validators.required),
      previousId : new FormControl(this.previousId , Validators.required) ,
      currentId : new FormControl(this.currentId ) ,
      removedId : new FormControl(this.removedId )



   });

         




  }

  closeDialog(){
     
    this.dialogRef.close();
  }


  getAllPosition(){

    this.positionService.getAllPosition(this.username).subscribe(
      data=>{
            this.positions = data
            this.positions.sort((a,b) => 
            a.positionName.localeCompare(b.positionName)
          );
           // console.log(this.positions);
          
      }

   );

}
getAllBranches(){
    
   this.branchSerivice.getBranch().subscribe( 
      data=>{
           this.branches = data;
           this.branches.sort((a,b) => a.branchCode - b.branchCode);
      }

   );
}

onChangePrevious(){

 
     this.previousRoles = new Array();
   //  console.log(this.notificationFormGroup.controls.previousId.value);
   
     
     for(let i = 0 ; i< this.positions.length; i++){
        if(this.positions[i]['id'] == this.notificationFormGroup.controls.previousId.value){
         for(let j =0; j< this.positions[i]['role'].length; j++){
              this.previousRoles.push(this.positions[i]['role'][j]['roleName']);

         }
        break;
      }

   }
 



  

  console.log(this.previousRoles)


     


}

  onChangeCurrent(){

   this.currentRoles = new Array();
 //  console.log(this.notificationFormGroup.controls.currentId.value);
 
   
   for(let i = 0 ; i< this.positions.length; i++){
      if(this.positions[i]['id'] == this.notificationFormGroup.controls.currentId.value){
       for(let j =0; j< this.positions[i]['role'].length; j++){
            this.currentRoles.push(this.positions[i]['role'][j]['roleName']);

       }
      break;
    }

 }
//console.log(this.currentRoles)


   
}


onChangeRemove(){

   this.removedRoles = new Array();
   //console.log(this.notificationFormGroup.controls.removedId.value);
 
   
   for(let i = 0 ; i< this.positions.length; i++){
      if(this.positions[i]['id'] == this.notificationFormGroup.controls.removedId.value){
       for(let j =0; j< this.positions[i]['role'].length; j++){
            this.removedRoles.push(this.positions[i]['role'][j]['roleName']);

       }
      break;
    }

 }
//console.log(this.removedRoles)


   
}



  initUpdateComponent(){
    this.username = this.data[0]['username'];
    this.notification = this.data[0]['data'];
    this.branchId = this.notification['branch'].id;

    this.previousId = this.notification['previousPosition'].id;

    this.currentId = this.notification['currentPosition'].id;
    
    this.removedId = this.notification['removedPosition'].id;
    this.notificationId = this.notification.id;
    this.getAllBranches();
    this.getAllPosition();
     this.populateRoles();
     
  }


  populateRoles(){
    for(let i = 0; i<  this.notification['previousPosition']['role'].length; i++)
    this.previousRoles.push(this.notification['previousPosition']['role'][i].roleName);
    //console.log(this.previousRoles);
    
    for(let i = 0; i<  this.notification['currentPosition']['role'].length; i++)
    this.currentRoles.push(this.notification['currentPosition']['role'][i].roleName);
    //console.log(this.currentRoles);

    for(let i = 0; i<  this.notification['removedPosition']['role'].length; i++)
    this.removedRoles.push(this.notification['removedPosition']['role'][i].roleName);
    //console.log(this.removedRoles);
  }


  updateNotification(){
 
    //console.log(this.notificationFormGroup.value);
      return this.notificationService.updateNotification(this.notificationFormGroup.value , this.username).subscribe( 
          data=>{
                this.toastr.success('successfully updated' , 'Notification');
                this.closeDialog();
          },
          error=>{
                this.toastr.error(error.error.message , 'Notification');
          }


      );

  }


}
