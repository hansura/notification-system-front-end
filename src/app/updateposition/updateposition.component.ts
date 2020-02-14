import { Component, OnInit, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RoleService } from '../service/rest-api/role.service';
import { PositionService } from '../service/rest-api/position.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Role } from '../model/Role';
import { PositionComponent } from '../position/position.component';
import { elementAt } from 'rxjs/Operators';

@Component({
  selector: 'app-updateposition',
  templateUrl: './updateposition.component.html',
  styleUrls: ['./updateposition.component.css']
})
export class UpdatepositionComponent implements OnInit {

    positionControlGroup : FormGroup;
    roles : any;
    position : any;
    username : any;
    message : any;
     roleIds : any;
  constructor(
     private toastr : ToastrService , 

     private matDialogRef : MatDialogRef<PositionComponent>,
      @Inject(MAT_DIALOG_DATA ) public data ,
       private  roleService :RoleService ,
       private positionService : PositionService
  ) { }

  ngOnInit() {

    this.position = this.data[0]['position'];
    this.username = this.data[0]['username'];
    let roles ;

    roles =  this.position['role'];
     let roleIdArray = new Array();
    for(let role of roles){
        roleIdArray.push (role.id);
     }
  // console.log('Role Id Arrray'+roleIdArray);
     
    this.positionControlGroup = new FormGroup({
       
         position : new FormGroup( {
               id : new FormControl( this.position.id , Validators.required) ,
               positionName : new FormControl(this.position.positionName, Validators.required),
                positionDescription : new FormControl(this.position.positionDescription, Validators.required)
         }),
         roleIds : new  FormControl(roleIdArray , Validators.required)

    });
  
        
    

    this.getRoles();
  }


  updatePosition(){
    
      
   return this.positionService.updatePosition(this.positionControlGroup.value , this.username).subscribe( 
       data=>{
           this.message ='';
           this.message = 'Update Successfully';
           this.toastr.success(this.message , 'position');
           this.closeDialog(); 
       },
       error=>{
           console.log(error.error.message);
       }
      
   )
  }

   
 
  getRoles(){
   
    this.roleService.getAllRoles(this.username).subscribe( 
     data =>{
         this.roles = data
       // console.log(this.roles);
     },
     error =>{
         
     }

    );
   }

     closeDialog(){
        this.matDialogRef.close();
     }


}
