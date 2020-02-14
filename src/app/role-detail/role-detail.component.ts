import { Component, OnInit } from '@angular/core';
import { Role } from '../model/Role';
import { MatTableDataSource } from '@angular/material';
import { RoleDemo } from '../model/RoleDemo';
import { FormGroup, FormControl, Validators, RequiredValidator } from '@angular/forms';
import { RoleService } from '../service/rest-api/role.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.css']
})
export class RoleDetailComponent implements OnInit {
 
  roleDemoFormGroup : FormGroup;
  username : any;
  constructor(private roleService : RoleService , private route : ActivatedRoute) { }
   roleDemo : RoleDemo;
   
      
  ngOnInit() {
       this.username = this.route.snapshot.params['username'];
      this.roleDemoFormGroup = new FormGroup( { 
          id : new FormControl( null) ,
          roleName : new FormControl( ),
          roleDescription : new FormControl()


      });
     
     
      
  }

   onSubmit(){
         this.roleDemo = this.roleDemoFormGroup.value
         console.log(this.roleDemoFormGroup.value);
         console.log(this.roleDemo)
         console.log(this.roleDemoFormGroup.controls.roleName.value);
          this.roleService.addRole(this.roleDemo, this.username).subscribe(
              success=>{
                  //  console.log(success.roleDescription);
                    this.roleDemoFormGroup.reset();
              },
              error=>{
                 console.log(error.error.message);
              }

          );
   }



}
