import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPositionType } from '../../ui/custom-toastr.service';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent {
  /**
   *
   */
  constructor(private httpClientService: HttpClientService, private alertifyService: AlertifyService, private toastrService: CustomToastrService) {


  }

  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOptions>;


  public selectedFiles(files: NgxFileDropEntry[]) {
    var adminPage = this.options.isAdminPage;
    var alertify = this.alertifyService;
    var toastr = this.toastrService;

    this.files = files;
    const fileData: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      })
    }
    this.httpClientService.post({
      controller: this.options.controller,
      action: this.options.action,
      queryString: this.options.queryString,
      headers: new HttpHeaders({ "responseType": "blob" })
    }, fileData).subscribe({
      error(errorResponse: HttpErrorResponse) {
        if (adminPage) {
          alertify.message(errorResponse.error, {
            dismissOthers: true,
            messageType: MessageType.Error,
            position: Position.TopRight
          })
        } else {
          toastr.message(errorResponse.error, "Error", {
            messageType: ToastrMessageType.Error,
            position: ToastrPositionType.TopRight
          })
        }

      },
      complete() {
        if (adminPage) {
          alertify.message("File Transfered Succesfully", {
            dismissOthers: true,
            messageType: MessageType.Success,
            position: Position.TopRight
          })
        } else {
          toastr.message("File Transfered Succesfully", "Error", {
            messageType: ToastrMessageType.Success,
            position: ToastrPositionType.TopRight
          })

        }

      }
    })
  }

}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}