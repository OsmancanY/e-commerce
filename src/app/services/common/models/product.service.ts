import { Injectable } from '@angular/core';
import { HttpClientService} from '../http-client.service';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, firstValueFrom} from 'rxjs';
import { List_Product } from 'src/app/contracts/list_products';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product: Create_Product, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
      controller: "products",
    }, product)
      .subscribe({
        error(errorResponse: HttpErrorResponse) {
          let message = "";
          const errors = errorResponse.error['errors'];
          for (const key in errors) {
            if (errors[key] !== null) {
              message += `${key}: ${errors[key]}<br>`;
            }
          }
          errorCallBack(message);
        },
        complete() {
          successCallBack();
          
        }
      })
  }

  

   async read(page:number =0, size: number = 5 , successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void):Promise<{totalCount:number,products:List_Product[]}> {
    const products:Promise<{totalCount:number,products:List_Product[]}> =  firstValueFrom(this.httpClientService.get<{totalCount:number,products:List_Product[]}>({
      controller:"products",
      queryString:`page=${page}&size=${size}`
    }));
    products.then(d=>successCallBack())
      .catch((errorResponse : HttpErrorResponse)=> errorCallBack(errorResponse.message))

    return await products;
  }

  async delete(id:string){
    const deleteObservable: Observable<any>= this.httpClientService.delete<any>({
      controller:"products"
    },id);

    await firstValueFrom(deleteObservable);
    
  }
}

