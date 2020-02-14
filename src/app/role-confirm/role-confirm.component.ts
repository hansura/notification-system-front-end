import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RoleService } from '../service/rest-api/role.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-role-confirm',
  templateUrl: './role-confirm.component.html',
  styleUrls: ['./role-confirm.component.css']
})
export class RoleConfirmComponent implements OnInit {
  username : any;
  roleId : any;

  constructor(
   @Inject(MAT_DIALOG_DATA) public data : any,
   public matDialogRef : MatDialogRef<RoleConfirmComponent>,
   private roleService : RoleService,
   private toastr : ToastrService


  ) { }

  ngOnInit() {
     console.log(this.data);
     this.roleId = this.data[0].roleId;
     this.username = this.data[1].username;
     console.log(this.roleId )
     console.log(this.username)

  }
 ok(){
  this.roleService.deleteRole(this.roleId , this.username).subscribe( 
    data => {
            this.toastr.success('successfully deleted' , 'role');
               this.close();
          },
    error=>{
     this.toastr.success('Unable to  deleted' , 'role');

    }
  
);

 }
 close(){
   this.matDialogRef.close();
 }


}
