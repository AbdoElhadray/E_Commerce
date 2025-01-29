import { WishlistService } from './../../core/services/wishlist.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Iproduct } from '../../core/interfaces/iproduct';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit , OnDestroy{
  private readonly _WishlistService=inject(WishlistService);
  private readonly _CartService=inject(CartService);
  private readonly _ToastrService=inject(ToastrService);

  wishListData!:Iproduct[];
  wishListSub!:Subscription
  getCartSub!:Subscription
  ngOnInit(){
    this.wishListSub= this._WishlistService.getLoggedUserWishlist().subscribe({
      next:(res)=>{
        this.wishListData=res.data
        console.log(this.wishListData)
      },
    })
  }
  delete(id:any,index:any){
    this._WishlistService.removeItemFromWishlist(id).subscribe({
      next:(res)=>{
        console.log(res);
        this._ToastrService.warning(res.message,'FreshCart',{closeButton:true});
        this.wishListData.splice(index,1);

        this._WishlistService.wishlistCount.next(res.data.length)
      }
    })
  };
  addToCart(id:string,index:any){
    this._CartService.addItemToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.delete(id,index);
        this._CartService.cartCount.next(res.numOfCartItems)
        this._ToastrService.success(res.message,'FreshCart',{closeButton:true})
      }
    })
  }
  ngOnDestroy(): void {
    this.wishListSub?.unsubscribe()
    this.getCartSub?.unsubscribe()
  }
}
