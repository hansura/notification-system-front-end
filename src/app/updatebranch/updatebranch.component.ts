import { Component, OnInit, Inject } from '@angular/core';
import { BranchService } from '../service/rest-api/branch.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Branch } from '../model/Branch';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-updatebranch',
  templateUrl: './updatebranch.component.html',
  styleUrls: ['./updatebranch.component.css']
})
export class UpdatebranchComponent implements OnInit {

  branchFormGroup : FormGroup;
  message : any;
  username : string;

  constructor( private branchService : BranchService ,
       private toster : ToastrService ,
        public dialogRef : MatDialogRef<UpdatebranchComponent>  ,
        @Inject(MAT_DIALOG_DATA) public data:  Branch ,
        private route : ActivatedRoute
    ) { }

  ngOnInit() {
     
      this.branchFormGroup = new FormGroup({
          id : new FormControl(this.data.id),
          branchCode : new FormControl(this.data.branchCode , Validators.required),
         branchName : new FormControl(this.data.branchName , Validators.required)

      });


  }
  
  updateBranch( ){

     this.branchService.modifyBranch(this.branchFormGroup.value).subscribe(
         data => {
          
             this.message = '';
             this.message = 'successfully updated';
             this.toster.success(this.message ,'updated'  );
            
             this.dialogRef.close();            
         },
         error =>{
          this.message = '';
          this.message = 'field to updated';
          this.toster.error( this.message ,'error' );
         }

      );
   
     

     
  
  }
   
 closeDialog(){
  this.dialogRef.close()  
 }

 


}
