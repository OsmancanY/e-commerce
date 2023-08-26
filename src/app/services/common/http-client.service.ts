import { Inject, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
import { Product } from 'src/app/contracts/product';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient:HttpClient, @Inject("baseUrl") private baseUrl:string) { 

  }

  private url  (requestParameters: Partial<RequestParameters>): string  {
    return `${requestParameters.baseUrl ? requestParameters.baseUrl:this.baseUrl}/${requestParameters.controller}${requestParameters.action ? `/${requestParameters.action}`:""}`
  }

  get<T>(requestParameters: Partial<RequestParameters>,id?:string):Observable<T>{
    let url: string="";
    if(requestParameters.fullEndPoint)
      url = requestParameters.fullEndPoint;
    else
    url=`${this.url(requestParameters)}${id ? `/${id}` : ""}${requestParameters.queryString ? `?${requestParameters.queryString}` : ""}`;

    return this.httpClient.get<T>(url,{headers:requestParameters.headers,});
  }
  post<T>(requestParameters: Partial<RequestParameters>,body:Partial<T>){
    let url: string="";
    if(requestParameters.fullEndPoint)
      url = requestParameters.fullEndPoint;
    else
    url=`${this.url(requestParameters)}${requestParameters.queryString ? `?${requestParameters.queryString}` : ""}`

    return this.httpClient.post<T>(url,body,{headers:requestParameters.headers})
  }
  put<T>(requestParameters: Partial<RequestParameters>,body:Partial<Product>){
    let url: string="";
    if(requestParameters.fullEndPoint)
      url = requestParameters.fullEndPoint;
    else
    url=`${this.url(requestParameters)}${requestParameters.queryString ? `?${requestParameters.queryString}` : ""}`;

    return this.httpClient.put<T>(url,body,{headers:requestParameters.headers})
  }
  delete<T>(requestParameters: Partial<RequestParameters>,id?:string){
    let url: string="";
    if(requestParameters.fullEndPoint)
      url = requestParameters.fullEndPoint;
    else
    url=`${this.url(requestParameters)}/${id}`;

    return this.httpClient.delete<T>(url,{headers:requestParameters.headers})

    
  }
  deleteImage<T>(requestParameters: Partial<RequestParameters>,productId:string,imageId?:string){
    let url: string="";
    if(requestParameters.fullEndPoint)
      url = requestParameters.fullEndPoint;
    else
    url=`${this.url(requestParameters)}/${productId}/${imageId}`;

    return this.httpClient.delete<T>(url,{headers:requestParameters.headers})

    
  }
}

export class RequestParameters {
  controller?:string;
  action?:string;
  headers?:HttpHeaders;
  baseUrl?:string;
  fullEndPoint?:string;
  queryString?:string;
}