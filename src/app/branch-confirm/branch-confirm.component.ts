import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BranchService } from '../service/rest-api/branch.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-branch-confirm',
  templateUrl: './branch-confirm.component.html',
  styleUrls: ['./branch-confirm.component.css']
})
export class BranchConfirmComponent implements OnInit {
   
   branchId : any;
  constructor(
   @Inject(MAT_DIALOG_DATA) public data : any,
   public dialogRef  : MatDialogRef<BranchConfirmComponent>,
   private branchService : BranchService,
   private toastr : ToastrService 

  ) { }

  ngOnInit() {
       this.branchId = this.data;
           console.log('branch id ' , this.data);
  }

  ok(){
    this.branchService.deleteBranch(this.branchId).subscribe( 
      data =>{
           this.toastr.success('Branch Successfully Deleted' , 'Branch');
           this.close();
      },
      error =>{
           this.toastr.error('Delete Branch Field ' , 'Branch');
      }
  );
 

  }

   close(){
   
       this.dialogRef.close();

   }



}
