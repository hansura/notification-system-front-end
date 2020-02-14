import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MaterialModule } from './material/material.module';
import { NotificationComponent } from './notification/notification.component';
import { RoleComponent } from './role/role.component';
import { PositionComponent } from './position/position.component';
import { BranchComponent } from './branch/branch.component';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { InterceptorService } from './service/interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { UpdatebranchComponent } from './updatebranch/updatebranch.component';
import { UpdateroleComponent } from './updaterole/updaterole.component';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { UpdatepositionComponent } from './updateposition/updateposition.component';
import { ListNotificationComponent } from './list-notification/list-notification.component';
import { UpdateNotificationComponent } from './update-notification/update-notification.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { RoleConfirmComponent } from './role-confirm/role-confirm.component';
import { PositionConfirmComponent } from './position-confirm/position-confirm.component';
import { BranchConfirmComponent } from './branch-confirm/branch-confirm.component';
import { ConfirmNotificationCloseComponent } from './confirm-notification-close/confirm-notification-close.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavigationComponent,
    NotificationComponent,
    RoleComponent,
    PositionComponent,
    BranchComponent,
    UpdatebranchComponent,
    UpdateroleComponent,
    RoleDetailComponent,
    UpdatepositionComponent,
    ListNotificationComponent,
    UpdateNotificationComponent,
    ConfirmDialogComponent,
    RoleConfirmComponent,
    PositionConfirmComponent,
    BranchConfirmComponent,
    ConfirmNotificationCloseComponent,
  
  ],
  entryComponents : [ 
      UpdatebranchComponent ,
      UpdateroleComponent 
     ,UpdatepositionComponent  , 
      UpdateNotificationComponent ,
       ConfirmDialogComponent
     , BranchConfirmComponent , 
      PositionConfirmComponent ,
      RoleConfirmComponent,
      ConfirmNotificationCloseComponent

      
    ] 
  ,
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    MaterialModule,
    HttpClientModule ,
    FormsModule ,
    ToastrModule.forRoot(
       {
          timeOut : 1200 ,
          progressBar : true ,
          progressAnimation : 'increasing' ,
          preventDuplicates : true
       }
    ),
    
    
    
  ],
  providers: [
   {  provide : HTTP_INTERCEPTORS , useClass : InterceptorService , multi : true } ,
    DatePipe 

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
