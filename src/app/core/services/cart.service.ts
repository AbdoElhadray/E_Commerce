import { inject, Injectable } from '@angular/core';
import { enviroments } from '../environments/enviroments';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // property in service to be global component to hol numOfCartItems
  // cartCount!:number
  cartCount:BehaviorSubject<number>= new BehaviorSubject(0)
  // clientToken:any ={token : sessionStorage.getItem('token')}
  private readonly _HttpClient =inject(HttpClient)
  constructor() { }
    
    getLoggedUserCart():Observable<any>{
      return this._HttpClient.get(`${enviroments.baseUrl}/api/v1/cart`)
    }
    addItemToCart(p_id:string):Observable<any>{
      return this._HttpClient.post(`${enviroments.baseUrl}/api/v1/cart`,{"productId": p_id})
    }
    removeItemFromCart(p_id:string):Observable<any>{
      return this._HttpClient.delete(`${enviroments.baseUrl}/api/v1/cart/${p_id}`)
    }
    updateItem(p_id:string,count:number):Observable<any>{
      return this._HttpClient.put(`${enviroments.baseUrl}/api/v1/cart/${p_id}`,{"count": count})
    }
}
