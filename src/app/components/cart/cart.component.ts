import { ICart } from './../../core/interfaces/icart';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit , OnDestroy {
  constructor(private _CartService:CartService){}
  private readonly _ToastrService=inject(ToastrService);

  getCartSub!:Subscription
  cartData :ICart={} as ICart


  removeItem(p_id:string){
    this._CartService.removeItemFromCart(p_id).subscribe({
      next:(res)=>{
        console.log(res)
        this._CartService.cartCount.next(res.numOfCartItems);
        this.cartData =res.data;
        this._ToastrService.info(res.message,'Fresh Cart', {timeOut:1000 ,closeButton:true})

      },
/*       error:(err)=>{
        console.log(err)
        this._ToastrService.error(err.message,'Fresh Cart', {timeOut:1000 ,closeButton:true})
      } */
    })
  }
  updateQuant(p_id:string,count:number){
    if(count>0){
      this._CartService.updateItem(p_id,count).subscribe({
      next:(res)=>{
        
        console.log(res)
        this.cartData =res.data
        this._ToastrService.info(res.message,'Fresh Cart', {timeOut:1000 ,closeButton:true})
      },
/*       error:(err)=>{
        console.log(err)
        this._ToastrService.error(err.message,'Fresh Cart', {timeOut:1000 ,closeButton:true})
      } */
      })
    }

  }
  ngOnInit(): void {
    this.getCartSub = this._CartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.cartData =res.data
      },
/*       error:(err)=>{console.log(err);}
 */
    })
  }

  ngOnDestroy(): void {
    this.getCartSub?.unsubscribe()
  }

}
