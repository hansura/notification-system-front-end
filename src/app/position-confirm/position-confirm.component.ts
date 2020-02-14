import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PositionService } from '../service/rest-api/position.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-position-confirm',
  templateUrl: './position-confirm.component.html',
  styleUrls: ['./position-confirm.component.css']
})
export class PositionConfirmComponent implements OnInit {
  
    username : any;
    positionId :any;
  
  constructor(
     @Inject(MAT_DIALOG_DATA)  public data :any,
     public matDialogRef : MatDialogRef<PositionConfirmComponent> ,
     private positionService : PositionService,
     private toastr : ToastrService


  ) { }

  ngOnInit() {
       console.log(this.data);
       this.positionId = this.data[0].positionId;
       this.username = this.data[1].username;
       console.log(this.username);
       console.log(this.positionId);

  }

  ok(){
    this.positionService.deletePosition( this.positionId, this.username).subscribe( 
      data => {
               this.toastr.success('Deleted Successfully' , 'Position')
                       this.close();
      },
      error=>{
               this.toastr.error('Feild to Delete' , 'Position');
      } 
   );


  }

  close(){
      this.matDialogRef.close();  

  }

}
