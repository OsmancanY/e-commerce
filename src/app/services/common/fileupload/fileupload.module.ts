import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileuploadComponent } from './fileupload.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { DialogModule } from 'src/app/dialogs/dialog.module';
import { FileuploadDialogComponent } from 'src/app/dialogs/fileupload-dialog/fileupload-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    FileuploadComponent,
    FileuploadDialogComponent
  ],
  imports: [
    CommonModule,
    NgxFileDropModule,
    MatDialogModule,
    MatButtonModule
    
  ],
  exports:[
    FileuploadComponent
  ]
})
export class FileuploadModule {
  
  
 }
