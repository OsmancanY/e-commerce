import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { List_Product } from 'src/app/contracts/list_products';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $ :any

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements AfterViewInit {
  /**
   *
   */
  constructor(private productService: ProductService, private spinner: NgxSpinnerService, private alertifyService: AlertifyService, private dialogService:DialogService) {


  }

  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate', 'updatedDate','edit','img-add','delete'];
  dataSource: MatTableDataSource<List_Product> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getProducts() {
    this.spinner.show(SpinnerType.Pacman)
    const allProducts: { totalCount: number, products: List_Product[] } = await this.productService.read(this.paginator.pageIndex ? this.paginator.pageIndex : 0, this.paginator.pageSize ? this.paginator.pageSize : 5, () => this.spinner.hide(SpinnerType.Pacman), errorMessage => this.alertifyService.message(errorMessage, {
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.TopRight
    }))
    this.dataSource = new MatTableDataSource<List_Product>(allProducts.products);


    this.paginator.length = allProducts.totalCount;

  }
  
  addProductImages(id :string){
    this.dialogService.openDialog({
      componentType : SelectProductImageDialogComponent,
      data: id,
      options:{
        width:"550px"
      }

    })
  }

  async pageChanged() {
    await this.getProducts()
  }

  async ngAfterViewInit() {
    await this.getProducts()
  }

}
