import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleService } from '../service/rest-api/role.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatPaginator, MatTableDataSource, MatSort, MatDialogConfig, MatDialogRef } from '@angular/material';
import { Role } from '../model/Role';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UpdateroleComponent } from '../updaterole/updaterole.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { RoleConfirmComponent } from '../role-confirm/role-confirm.component';



@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})

export class RoleComponent implements OnInit {
        roleFormGroup : FormGroup;
       username :any;
       roles : any;
       dataSource : any;
       message : any;
        displaysColumns  : string []= [ 'roleName' , 'roleDescription' , 'action'];

     @ViewChild( MatPaginator , {static : true}) paginator : MatPaginator;
      @ViewChild(MatSort  ,{static : true}) sort : MatSort;

  constructor(
    private roleService : RoleService  ,
    private toastr : ToastrService,
    public matDialog : MatDialog ,
    private route : ActivatedRoute 
  

  ) { }

  ngOnInit() {

    this.username  = this.route.snapshot.params['username'];
    console.log(this.username)
     this.roleFormGroup = new FormGroup({
           id : new FormControl(null),
           roleName : new FormControl('', Validators.required),
           roleDescription : new FormControl('' , Validators.required)

     });

    
    this.getAllRole();
  }


   getAllRole(){

    this.roleService.getAllRoles(this.username).subscribe( 
        data => {
               this.roles = data;
               this.dataSource = new MatTableDataSource(this.roles);
               this.dataSource.paginator = this.paginator;
               this.dataSource.sort = this.sort;
                //console.log(this.roles);

        } ,error => {
               console.log("error " +  error.error.message);
        }   
 
    );


   }

  registerRole(){
       
      // console.log('role ' + this.roleFormGroup.value);
   
    this.roleService.addRole(this.roleFormGroup.value , this.username).subscribe( 
      data=> {
            this.message = '';
            this.roleFormGroup.reset();
            this.message = 'Successfully Registered';
            this.toastr.success ('Role' , this.message);

            this.getAllRole();
          //  console.log(this.roles);
      }, 
      error => {
          this.message  = ' ';
          this.message = error.error.message;
          this.toastr.error('Role' , this.message);
      }

    );



  }
  applyFilter(search : any){
     this.dataSource.filter = search.trim().toLowerCase();

  }
updateRole(role : Role ){
   
  console.log('old role' , role);
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "60%";
  dialogConfig.data  = [{role : role , username : this.username} ];
  

   this.matDialog.open(UpdateroleComponent , dialogConfig).afterClosed().subscribe( 
      data =>{
           this.ngOnInit();
      }
   );
    
  
}
deleteRole(role :any ){
  
  const matDialogConfig = new MatDialogConfig();
    matDialogConfig.disableClose = true;
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = "50%";
    matDialogConfig.data = [ {roleId : role } , { username : this.username }];

   this.matDialog.open(RoleConfirmComponent , matDialogConfig).afterClosed().subscribe(
     data => {
        this.ngOnInit();
     }
   );

}




}
