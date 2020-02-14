import { Component, OnInit } from '@angular/core';
import { PositionService } from '../service/rest-api/position.service';
import { NotificationService } from '../service/rest-api/notification.service';
import { BranchService } from '../service/rest-api/branch.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Branch } from '../model/Branch';
import { Role } from '../model/Role';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

   notificationFormGroup : FormGroup;
   username : any;
   branches  : Branch[];
   positions ;
    previousRoles  = new Array();
    currentRoles  = new Array();
    removedRoles = new Array();

  constructor(
      private positionService : PositionService,
      private notificationService : NotificationService,
      private branchSerivice : BranchService ,
      private route : ActivatedRoute      ,
      private toastr : ToastrService ,
      private router : Router

   ) { }
   
  ngOnInit() {
        
      

         this.username = this.route.snapshot.params['username'];
         this.getAllBranches();
         this.getAllPosition();
          this.notificationFormGroup = new FormGroup( {
              
             notification : new FormGroup( { 
                  
                   issueId : new FormControl('' , Validators.required),
                   userId : new FormControl('' , Validators.required),
                   removedUserId : new FormControl( ''),
                   dateFrom : new FormControl('', Validators.required),
                   dateUpto : new FormControl('' ),
                   makerId : new FormControl(this.username)
               
             }),

             branchId : new FormControl('' ,Validators.required),
             previousId : new FormControl('' , Validators.required) ,
             currentId : new FormControl('' ) ,
             removedId : new FormControl('' )



          });


  }

getAllPosition(){

   this.positions = new Array();
    this.positionService.getAllPosition(this.username).subscribe(
      data=>{
            this.positions = data
            this.positions.sort((a,b) => 
              a.positionName.localeCompare(b.positionName)
            );
          //  console.log(this.positions);
          
      }

   );

}
getAllBranches(){
    
   this.branchSerivice.getBranch().subscribe( 
      data=>{
           this.branches = data;
           this.branches.sort(( a, b)=> a.branchCode-b.branchCode);
      }

   );
}

onChangePrevious(){

     this.previousRoles = new Array();
   //   console.log(this.notificationFormGroup.controls.previousId.value);
   
     
     for(let i = 0 ; i< this.positions.length; i++){
        if(this.positions[i]['id'] == this.notificationFormGroup.controls.previousId.value){
         for(let j =0; j< this.positions[i]['role'].length; j++){
              this.previousRoles.push(this.positions[i]['role'][j]['roleName']);

         }
        break;
      }
   }
//   console.log(this.previousRoles)


     
  }



  onChangeCurrent(){

   this.currentRoles = new Array();
   // console.log(this.notificationFormGroup.controls.currentId.value);
 
   
   for(let i = 0 ; i< this.positions.length; i++){
      if(this.positions[i]['id'] == this.notificationFormGroup.controls.currentId.value){
       for(let j =0; j< this.positions[i]['role'].length; j++){
            this.currentRoles.push(this.positions[i]['role'][j]['roleName']);

       }
      break;
    }

 }
// console.log(this.currentRoles)


   
}


onChangeRemove(){

   this.removedRoles = new Array();
   // console.log(this.notificationFormGroup.controls.removedId.value);
 
   
   for(let i = 0 ; i< this.positions.length; i++){
      if(this.positions[i]['id'] == this.notificationFormGroup.controls.removedId.value){
       for(let j =0; j< this.positions[i]['role'].length; j++){
            this.removedRoles.push(this.positions[i]['role'][j]['roleName']);

       }
      break;
    }

 }
// console.log(this.removedRoles)


   
}

postNotification(){
    
   // console.log(this.notificationFormGroup.value);
 
   this.notificationService.postNotification(this.notificationFormGroup.value , this.username).subscribe(
     data=>{
          this.toastr.success('successfully Registered' ,'notification');
           this.notificationFormGroup.reset();
           this.currentRoles = new Array();
           this.previousRoles = new Array();
           this.removedRoles = new Array();
           this.router.navigate(['list-notification' , this.username]);
     },
     error =>{
      this.toastr.error(error.error.message ,'notification');

     }

   );

}

}
