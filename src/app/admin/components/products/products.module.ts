import { NgModule,AfterViewInit,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { DeleteDirective } from 'src/app/directives/admin/delete.directive';
import {MatDialogModule} from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { FileuploadModule } from 'src/app/services/common/fileupload/fileupload.module';
import { FileuploadDialogComponent } from 'src/app/dialogs/fileupload-dialog/fileupload-dialog.component';
import { BaseDialog } from 'src/app/dialogs/base/base-dialog';
import { DialogModule } from 'src/app/dialogs/dialog.module';
import { DeleteDirectiveModule } from 'src/app/directives/admin/deletedirective.module';


@NgModule({
  declarations: [
    ProductsComponent,
    CreateComponent,
    ListComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:ProductsComponent}
    ]),
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    FileuploadModule,
    DialogModule,
    DeleteDirectiveModule
    
  ]
})
export class ProductsModule { }
