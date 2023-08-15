import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { Product } from 'src/app/contracts/product';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ListComponent } from './list/list.component';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent extends BaseComponent implements OnInit {
  /**
   *
   */
  constructor(spinner : NgxSpinnerService,private httpClientService:HttpClientService) {
    super(spinner);
    
  }
  @ViewChild(ListComponent) listComponents : ListComponent

  ngOnInit(): void {
    this.showSpinner(SpinnerType.Pacman);
    
   this.httpClientService.get<Product[]>({controller:"products"}).subscribe()
  }
  

  createdProduct(create_product:Create_Product) {
    this.listComponents.getProducts();
  }

}
