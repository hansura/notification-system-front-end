import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { Branch } from '../model/Branch';
import {  MatDialog, MatSnackBar, MatDialogConfig, MatSort } from '@angular/material';
import { BranchService } from '../service/rest-api/branch.service';
import { ToastrService } from 'ngx-toastr';
import { UpdatebranchComponent } from '../updatebranch/updatebranch.component';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BranchConfirmComponent } from '../branch-confirm/branch-confirm.component';


@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})

export class BranchComponent implements OnInit {

  branchFormGroup : FormGroup;
  @ViewChild(MatSort , {static: true}) sort : MatSort
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  branch : Branch ;
  branchs : any;
  message : any;   
  dataSource : any ; 
  username : any;
   displayColumns : string [] = [ "branchCode" , "branchName" , "action"];
  constructor(
         private branchService : BranchService ,
         private toastr : ToastrService ,
         public matdialog : MatDialog ,
         private router : Router 

  ) { }

  
  ngOnInit() {
    this.branchFormGroup = new FormGroup( {
      id : new FormControl( null),
      branchCode : new FormControl('',Validators.required),
      branchName : new FormControl ('',Validators.required)


    });
    this.getAllBranch();

    
  }
  
   applyFilter(search : string){

    this.dataSource.filter =  search.trim().toLowerCase();
   }
   
  
   registerBranch( ){
       this.branch = this.branchFormGroup.value;
     console.log('regitering branch '+ this.branch)

     this.branchService.addBranch(this.branch).subscribe(
             data => {
                 this.message = '';
                  this.branchFormGroup.reset();
                 this.message = 'successfully registered';
                  this.successMessage();
                  this.getAllBranch();
              },
              error => {
                this.message = '';
                  this.message = error.error.message;
                  console.log(this.message);
                  this.errorMesssage();
              }

           );
        

   }

   getAllBranch(){
     
    this.branchService.getBranch().subscribe(
      data => { 
          this.branchs  = data;
          this.dataSource = new MatTableDataSource<Branch>(this.branchs);
          this.dataSource.sort = this.sort;

          this.dataSource.paginator = this.paginator;  

      },
      error => {
            console.log(error.error.message)
             
      }

  );
     
    
   }

  
  successMessage(){
  this.toastr.success(this.message , 'Bracnh ');
  }
  errorMesssage(){
     this.toastr.error( this.message , 'Error');
  }


  updateBranch(branch){
    
    
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      dialogConfig.data = branch;
     this.matdialog.open(UpdatebranchComponent ,  dialogConfig ).afterClosed().subscribe( 
         response => {
           this.ngOnInit();
         }
     );
 

  }
   deleteBranch(branch){
    
     const dialogConfig = new MatDialogConfig();
     dialogConfig.disableClose = true;
     dialogConfig.autoFocus = true;
     dialogConfig.data = branch;
     dialogConfig.width = "50%";

     this.matdialog.open(BranchConfirmComponent, dialogConfig).afterClosed().subscribe( 
            data=>{ 
               this.ngOnInit();
            }

     );

   }

 

}
