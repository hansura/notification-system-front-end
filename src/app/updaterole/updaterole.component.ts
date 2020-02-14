import { Component, OnInit, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Role } from '../model/Role';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RoleService } from '../service/rest-api/role.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-updaterole',
  templateUrl: './updaterole.component.html',
  styleUrls: ['./updaterole.component.css']
})
export class UpdateroleComponent implements OnInit {

  roleFormGroup : FormGroup;
  message : any;
  username : string;
  role : Role;
  constructor(
    private toastr : ToastrService ,
    private matDialogRef : MatDialogRef<Role> ,
     @Inject(MAT_DIALOG_DATA) public data   ,
     private roleService : RoleService,
     private route : ActivatedRoute

  ) { }

  ngOnInit() {
         
           this.role = this.data[0]['role'];
           this.username = this.data[0]['username'];
           console.log(this.username);
      this.roleFormGroup  = new FormGroup({
        id : new FormControl(this.role.id , Validators.required ),
        roleName : new FormControl(this.role.roleName , Validators.required),
        roleDescription : new FormControl(this.role.roleDescription , Validators.required)

      });
      //console.log('old value '+ this.roleFormGroup.value);
   
  }

  updateRole( ) {
    // console.log(this.username);
    // console.log('updated - role' + this.roleFormGroup.value)
      this.roleService.updateRole(this.roleFormGroup.value , this.username ).subscribe(
          data =>{
            this.message = '';
            this.message ='Updated Successfully';
           // console.log('data - passed '+ this.roleFormGroup.value);
            this.toastr.success('role' + this.message);
            this.closeDialog();
          },
          error=>{
             this.message = '';
             this.message ='Update Field';
             this.toastr.error('role' , this.message);
           //  console.log('role-error' , error.error.message);
          }

      );

  }
  closeDialog(){
     this.matDialogRef.close();
  }

}
