import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NotificationComponent } from './notification/notification.component';
import { RouterGurdService } from './service/router-gurd.service';
import { NavigationComponent } from './navigation/navigation.component';
import { RoleComponent } from './role/role.component';
import { PositionComponent } from './position/position.component';
import { BranchComponent } from './branch/branch.component';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { ListNotificationComponent } from './list-notification/list-notification.component';



const routes: Routes = [
  {path : "login" , component : LoginComponent} ,
  {path: "register" , component : RegisterComponent },
  {path : "notification/:username" , component : NotificationComponent , canActivate : [ RouterGurdService]},
  {path : "list-notification/:username" , component : ListNotificationComponent , canActivate : [ RouterGurdService]},
  {path : "role/:username" , component : RoleComponent , canActivate : [ RouterGurdService]},
  {path : "role-detail/:username" , component : RoleDetailComponent },
  {path : "position/:username" , component : PositionComponent , canActivate : [ RouterGurdService]},
  {path : "branch/:username" , component : BranchComponent , canActivate : [ RouterGurdService]},

  {path :"**" , component : LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
