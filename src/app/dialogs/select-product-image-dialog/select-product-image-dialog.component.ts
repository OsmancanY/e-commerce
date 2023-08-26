import { Component, Inject, OnInit, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from 'src/app/services/common/fileupload/fileupload.component';
import { ProductService } from 'src/app/services/common/models/product.service';
import { List_Product_Image } from 'src/app/contracts/list_product_image';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit {
  constructor(
    dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectState | string,
    private productService: ProductService,
    private spinner: NgxSpinnerService
  ) {
    super(dialogRef)
  }

  images: List_Product_Image[];

  async deleteImage(imageId: string) {
    this.spinner.show(SpinnerType.Pacman);
    await this.productService.deleteImage(this.data as string, imageId, () => this.spinner.hide(SpinnerType.Pacman));
  }

  async ngOnInit() {
    this.spinner.show(SpinnerType.Pacman);
    await this.productService.readImages(this.data as string).then(images => {
      this.images = images;
      this.spinner.hide(SpinnerType.Pacman)
    });
  }



  @Output() options: Partial<FileUploadOptions> = {
    accept: ".png,.svg,.jpeg,.jpg,.gif",
    action: "upload",
    controller: "products",
    explanation: "Select Images For Product",
    isAdminPage: true,
    queryString: `id=${this.data}`

  }
}

export enum SelectState {
  Close
}
