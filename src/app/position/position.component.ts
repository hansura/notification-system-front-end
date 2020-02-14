import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PositionService } from '../service/rest-api/position.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { Role } from '../model/Role';
import { RoleService } from '../service/rest-api/role.service';
import { ToastrService } from 'ngx-toastr';
import { UpdatepositionComponent } from '../updateposition/updateposition.component';
import { PositionConfirmComponent } from '../position-confirm/position-confirm.component';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {

  positionControlGroup : FormGroup;
   position : Position[];
   username : any;
   displayedColumns : string [] = ['positionName' , 'positionDescription' , 'role' ,'action'];
   dataSource : any;
   roles : Role[];
   positionRole : Role [];
   message : any;

   @ViewChild(MatPaginator , {static:true}) paginator : MatPaginator;

   constructor(
     private positionService : PositionService ,
     private route : ActivatedRoute  ,
     private roleService : RoleService ,
     private toastr : ToastrService ,
     private matDialog : MatDialog
    
    ) { }

  ngOnInit() {
    this.username = this.route.snapshot.params['username'];
     this.positionControlGroup = new FormGroup({
         
         position : new FormGroup( {
            id : new FormControl('' , Validators.required),
            positionName : new FormControl('' , Validators.required),
            positionDescription : new FormControl('', Validators.required)
          }),
         
          roleIds : new  FormControl(null , Validators.required)
         
             


     });

      

     this.getRoles();
    this.getAllPositions();
     
  }

   getAllPositions(){

  

    this.positionService.getAllPosition(this.username).subscribe(

      data => {
           this.position = data;
           this.dataSource = new  MatTableDataSource<Position>(this.position);
           this.dataSource.paginator = this.paginator;
           this.dataSource.data.splice
        // console.log('position with role'  );

          
         
        //  console.log(this.position);
      },
      error => {
           console.log(error.error.message);
      }
   );

  



   }
   
   addPosition(){
           
    
         this.positionService.addPosition(this.positionControlGroup.value , this.username).subscribe(
               data =>{
                   this.message = '';
                   this.message = 'Successfully Submitted'
                   this.toastr.success(this.message , 'Position');
                   this.getAllPositions();
                   this.positionControlGroup.reset();
               },
               error=>{
                   this.message = '';
                     this.message = error.error.message;
                     this.toastr.error(this.message , 'Position');
               }
               
            
         );

    }


   updatePosition(row ){
         
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "60%";
        dialogConfig.data  = [{ position : row , username : this.username}];
        
       this.matDialog.open(UpdatepositionComponent, dialogConfig).afterClosed().subscribe(
           data =>{
                 this.ngOnInit();
           }
       );

   }

   deletePosition(row ){
      const matDialogConfig = new MatDialogConfig();
      matDialogConfig.disableClose = true;
      matDialogConfig.autoFocus = true;
      matDialogConfig.width = "50%";
      matDialogConfig.data = [{positionId : row } , { username : this.username}];
      this.matDialog.open(PositionConfirmComponent, matDialogConfig).afterClosed().subscribe( 
         data => { this.ngOnInit(); }
      ); 


   }


   
    getRoles(){
   
     this.roleService.getAllRoles(this.username).subscribe( 
      data =>{
          this.roles= data
        // console.log(this.roles);
      },
      error =>{
          
      }

     );
    }
    applyFilter(search : any){
      this.dataSource.filter = search.trim().toLowerCase();
 
   }




}
