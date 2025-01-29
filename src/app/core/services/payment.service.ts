import { url } from 'inspector';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroments } from '../environments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private _HttpClient:HttpClient) { }
/*   clientToken:any ={token : sessionStorage.getItem('token')}
 */
  checkoutSession(cardId:string|null , shippingData:object):Observable<any>{
    return this._HttpClient.post(
     ` ${enviroments.baseUrl}/api/v1/orders/checkout-session/${cardId}?url=${enviroments.url}`
    ,{
      "shippingAddress":shippingData
    }
    )
  }

}


