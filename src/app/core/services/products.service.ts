import { enviroments } from './../environments/enviroments';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient:HttpClient) { }
  getAllProducts():Observable<any>{
    return this._HttpClient.get(`${enviroments.baseUrl}/api/v1/products`)
  }
  getProductDetails(id:string|null):Observable<any>{
    return this._HttpClient.get(`${enviroments.baseUrl}/api/v1/products/${id}`)
  }
}
