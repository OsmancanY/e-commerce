import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { AlertifyService, AlertifyOptions, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {
  /**
   *
   */
  constructor(spiner: NgxSpinnerService, private productService: ProductService, private alertify: AlertifyService) {
    super(spiner)
  }
  ngOnInit(): void {

  }

  @Output() createdProduct : EventEmitter<Create_Product> = new EventEmitter();

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    this.showSpinner(SpinnerType.Pacman);
    const create_product: Create_Product = new Create_Product();
    create_product.name = name.value;
    create_product.stock = Number(stock.value);
    create_product.price = Number(price.value);

    if (!name.value) {
      this.alertify.message("U Shall Not Pass Null",{
        dismissOthers:true,
        messageType:MessageType.Warning,
        position:Position.TopRight
      })
      return;
    }
    if (parseInt(stock.value)<0) {
      this.alertify.message("It can only take higher than 0 values",{
        dismissOthers:true,
        messageType:MessageType.Warning,
        position:Position.TopRight
      })
      return;
    }
    if (parseInt(price.value)<0) {
      this.alertify.message("It can only take higher than 0 values",{
        dismissOthers:true,
        messageType:MessageType.Warning,
        position:Position.TopRight
      })
      return;
    }
    

    this.productService.create(create_product, () => {
      this.hideSpinner(SpinnerType.Pacman),
        this.alertify.message("Product Added Succesfully", {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.TopRight
        });
        this.createdProduct.emit(create_product);
    }, errorMessage => {
      this.alertify.message(errorMessage, {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
    });
  }
}
