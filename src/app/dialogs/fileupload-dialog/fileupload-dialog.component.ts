import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';


@Component({
  selector: 'app-fileupload-dialog',
  templateUrl: './fileupload-dialog.component.html',
  styleUrls: ['./fileupload-dialog.component.scss']
})
export class FileuploadDialogComponent extends BaseDialog<FileuploadDialogComponent> {
  /**
   *
   */
  constructor(
    dialogRef: MatDialogRef<FileuploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UploadState,
  ) {
    super(dialogRef);
    
  }
}

export enum UploadState{
  Yes,No
}