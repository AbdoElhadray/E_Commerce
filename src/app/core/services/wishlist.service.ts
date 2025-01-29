import { inject, Injectable } from '@angular/core';
import { enviroments } from '../environments/enviroments';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  wishlistCount:BehaviorSubject<number>= new BehaviorSubject(0)
  private readonly _HttpClient =inject(HttpClient)
  constructor() { }
    
    getLoggedUserWishlist():Observable<any>{
      return this._HttpClient.get(`${enviroments.baseUrl}/api/v1/wishlist`)
    }
    addItemToWishlist(p_id:string):Observable<any>{
      return this._HttpClient.post(`${enviroments.baseUrl}/api/v1/wishlist`,{"productId": p_id})
    }
    removeItemFromWishlist(p_id:string):Observable<any>{
      return this._HttpClient.delete(`${enviroments.baseUrl}/api/v1/wishlist/${p_id}`)
    }

}

