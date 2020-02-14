import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';
import { ValidationService } from '../service/validation.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   isRegistered = false;
   message : any;
   success = '';
   registered = false;

   loginFormGroup : FormGroup
  constructor(private router : Router  , private validationService : ValidationService) { }
  hide : boolean;
  ngOnInit() {

    this.loginFormGroup = new FormGroup( { 
          
      username : new FormControl('' , Validators.required),
      password : new FormControl('' , Validators.required) ,
      confirm_password : new FormControl('' , Validators.required)

  });

    this.hide  = true;
  }
   

   registerUser(){
       
 // console.log(this.loginFormGroup.value);
      if(this.loginFormGroup.controls.confirm_password.value == this.loginFormGroup.controls.password.value)
      {
    this.validationService.registerUser(this.loginFormGroup.value).subscribe(
       data => {
             this.isRegistered = false;
             this.registered = true;
             this. message  = '';
              this.success = 'successfully Registered';
              this.loginFormGroup.reset();
           
       },
       error =>{
          this.isRegistered = true;
          if(error.error.message == "")
           this.message= "something went wrong"
           else
           this. message = error.error.message;
           
           this.registered = false;
           this.success = '';
           
           console.log(this.message);
       }
      


    );
      

   }else
   {
       console.log('value not match');
    
   }

  }

}
