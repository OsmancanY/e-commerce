import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';


declare var $: any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    public dialog: MatDialog,
    private alertify: AlertifyService,
    private dialogService: DialogService
  ) {
    const img = _renderer.createElement("img");
    img.setAttribute("src", "../../../../../assets/icons8-delete.svg")
    img.setAttribute("style", "cursor:pointer;")
    img.height = 50;
    _renderer.appendChild(element.nativeElement, img)
  }
  @Input() id: string;
  @Input() controllerName: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();

  @HostListener("click")
  async onclick() {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        const td: HTMLTableCellElement = this.element.nativeElement;
        await this.httpClientService.delete({
          controller: this.controllerName
        }, this.id).subscribe(() => {


          (errorResponse: HttpErrorResponse) => {
            this.alertify.message(JSON.stringify(errorResponse.error), {
              dismissOthers: true,
              messageType: MessageType.Error,
              position: Position.TopRight
            })
          }


          $(td.parentElement).fadeOut(2000, (event: any) => { this.callback.emit() });
          this.alertify.message("Deleted", {
            dismissOthers: true,
            messageType: MessageType.Success,
            position: Position.TopRight
          })
        });
      }
    })
  }

}





