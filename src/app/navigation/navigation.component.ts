import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../service/rest-api/login.service';
import { ValidationService } from '../service/validation.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private router : Router , private route : ActivatedRoute , private validationService : ValidationService) { }
    username : any;
  ngOnInit() {
    this.username = this.route.snapshot.params['username'];
    console.log('username ' + this.username);
    
  }

  notification(){
   return this.router.navigate(['list-notification', this.username]);
  }
  role(){
    return this.router.navigate(['role' , this.username]);
  }


  position(){
    return this.router.navigate(['position',this.username]);
  }
  branch(){

    return this.router.navigate(['branch',this.username]);
  }

  logout(){
      
    this.validationService.logout();
  }






}
