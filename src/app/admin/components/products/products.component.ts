import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Product } from 'src/app/contracts/product';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {
  /**
   *
   */
  constructor(spinner : NgxSpinnerService,private httpClientService:HttpClientService) {
    super(spinner);
    
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.Pacman);
    
   this.httpClientService.get<Product[]>({controller:"products"}).subscribe()

   /*  this.httpClientService.post({controller:"products"},{name:"BlueTea",stock:"15",price:"125"}).subscribe() 

   this.httpClientService.put({controller:"products"},{id:"f23f6450-abab-4cf4-b6fa-480940466e94",name:"BlueTea",stock:"30",price:"125"}).subscribe()

   this.httpClientService.delete({controller:"products"},{id:"f23f6450-abab-4cf4-b6fa-480940466e94"}).subscribe()*/
  }

}
