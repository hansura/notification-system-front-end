import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../model/User';
import { ValidationService } from '../service/validation.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidUser = false;
   message : any;
   success : any;
    loginFormGroup : FormGroup;
  constructor( private router:Router , private validationService : ValidationService) {}
  hide : boolean;
  ngOnInit() {

  
       this.loginFormGroup = new FormGroup( { 
          
           username : new FormControl('' , Validators.required),
           password : new FormControl('' , Validators.required)

       });

      this.hide = true;
  
      if(this.validationService.isUserLoggedIn())
        {
          return this.router.navigate(['list-notification' , this.validationService.getUserName()]);
        }
        else
        {
           this.router.navigate(['login']);
        }

  }




   login(){
    //  console.log('username '+ this.loginFormGroup.value);
      
      this.validationService.authenticate(this.loginFormGroup.value).subscribe( 
        data => {
            this.router.navigate(['list-notification' , this.loginFormGroup.controls.username.value]);
            this.invalidUser = false;
             
         } ,
         error =>{
              this.invalidUser = true;
              if(error.error.message == "" )
                 this.message = 'something went wrong';
               else
              this.message = error.error.message;
               
               // console.log(this.message);
         }

      );


   }



  navigateToRegister(){
      
    return this.router.navigate(['register']);

  }

}
