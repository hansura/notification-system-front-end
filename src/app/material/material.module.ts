import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule
        , MatIconModule
         , MatBadgeModule
         , MatToolbarModule,
         MatInputModule,
         MatProgressBarModule,
         MatTableModule,
         MatPaginatorModule ,
         MatSortModule,
         MatDialogModule,
         MatSnackBarModule,
         MatExpansionModule,
         MatSelectModule,
         MatDatepickerModule,
         MatListModule,
         MatNativeDateModule,
        } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';


      const materials = [
        MatButtonModule,
        MatIconModule,
        MatBadgeModule ,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule ,
        MatProgressBarModule,
        MatTableModule ,
        MatPaginatorModule,
        MatSortModule , 
        MatDialogModule,
        MatSnackBarModule ,
        ReactiveFormsModule,
        MatExpansionModule,
        MatSelectModule, 
        MatListModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatBadgeModule
     

       ];

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    materials
  ] ,
  exports : [ materials]
})
export class MaterialModule { }
